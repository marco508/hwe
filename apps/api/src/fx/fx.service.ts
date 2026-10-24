import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import type { FxRatesResponse } from "@hwe/types";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { ECB_URL, ER_API_URL, finalizeRates, parseEcbXml, parseErApi, staticSnapshot, type FxSnapshot } from "./fx-sources";

const DAY_MS = 24 * 3600 * 1000;

/**
 * Taux de change réels, quotidiens, côté serveur (le navigateur n'appelle
 * jamais de service tiers) : récupération chaque jour à 06:00 UTC, et au
 * démarrage si les derniers taux ont plus de 24 h. Un instantané par
 * récupération dans la table FxRate.
 */
@Injectable()
export class FxService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FxService.name);
  private cache: { value: FxRatesResponse; at: number } | null = null;

  constructor(private readonly prisma: PrismaService) {}

  onApplicationBootstrap() {
    if (process.env.FX_DISABLE_FETCH === "1") return;
    // Sans bloquer le démarrage.
    void this.refreshIfStale().catch((e) => this.logger.warn(`Taux de change : ${(e as Error).message}`));
  }

  @Cron("0 6 * * *", { timeZone: "UTC" })
  async daily() {
    if (process.env.DISABLE_SCHEDULERS === "1" || process.env.FX_DISABLE_FETCH === "1") return;
    await withAdvisoryLock(this.prisma, "fx-daily", async () => {
      await this.refresh();
    }).catch((e) => this.logger.warn(`Taux de change : ${(e as Error).message}`));
  }

  async refreshIfStale(now = new Date()) {
    const last = await this.prisma.fxRate.findFirst({ orderBy: { fetchedAt: "desc" }, select: { fetchedAt: true, source: true } });
    if (last && last.source !== "static" && now.getTime() - last.fetchedAt.getTime() < DAY_MS) return false;
    await this.refresh();
    return true;
  }

  /** Récupère les taux (open.er-api → BCE → statique) et les enregistre. */
  async refresh(): Promise<FxSnapshot> {
    const snap = (await this.fromErApi()) ?? (await this.fromEcb()) ?? staticSnapshot();
    await this.prisma.fxRate.create({
      data: { base: "EUR", date: new Date(`${snap.date}T00:00:00.000Z`), source: snap.source, rates: snap.rates },
    });
    this.cache = null;
    this.logger.log(`Taux de change du ${snap.date} enregistrés (${snap.source}, ${Object.keys(snap.rates).length} devises).`);
    return snap;
  }

  private async fetchWithTimeout(url: string, ms = 10_000): Promise<Response | null> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
      const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "hwe-api (taux de change)" } });
      return r.ok ? r : null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  private async fromErApi(): Promise<FxSnapshot | null> {
    const r = await this.fetchWithTimeout(ER_API_URL);
    if (!r) return null;
    try {
      return parseErApi(await r.json());
    } catch {
      return null;
    }
  }

  private async fromEcb(): Promise<FxSnapshot | null> {
    const r = await this.fetchWithTimeout(ECB_URL);
    if (!r) return null;
    try {
      return parseEcbXml(await r.text());
    } catch {
      return null;
    }
  }

  /** Derniers taux connus (cache mémoire 10 min), table statique à défaut. */
  async latest(): Promise<FxRatesResponse> {
    if (this.cache && Date.now() - this.cache.at < 10 * 60_000) return this.cache.value;
    const row = await this.prisma.fxRate.findFirst({ orderBy: { fetchedAt: "desc" } }).catch(() => null);
    const value: FxRatesResponse = row
      ? {
          base: "EUR",
          date: row.date.toISOString().slice(0, 10),
          source: row.source,
          fetchedAt: row.fetchedAt.toISOString(),
          rates: finalizeRates(row.rates as Record<string, number>),
        }
      : (() => {
          const s = staticSnapshot();
          return { base: "EUR" as const, date: s.date, source: s.source, fetchedAt: new Date().toISOString(), rates: s.rates };
        })();
    this.cache = { value, at: Date.now() };
    return value;
  }

  /** Conversion indicative avec les derniers taux (null si une devise est inconnue). */
  async convert(amount: number, from: string, to: string): Promise<number | null> {
    const { rates } = await this.latest();
    const f = rates[from.toUpperCase()];
    const t = rates[to.toUpperCase()];
    if (!f || !t) return null;
    return (amount / f) * t;
  }
}
