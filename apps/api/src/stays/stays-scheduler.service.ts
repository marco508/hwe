import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { today as todayDay } from "../common/dates";
import { StaysService } from "./stays.service";
import { fetchIcal, parseIcal } from "./ical";
import { addDays, BOOKING_HORIZON_DAYS } from "./stays-rules";

/**
 * Tâches des séjours, sous verrou consultatif (une seule exécution même avec
 * plusieurs réplicas) :
 *  - toutes les 10 min : demandes expirées, paiements non reçus, séjours terminés ;
 *  - toutes les heures : relecture des calendriers iCal importés.
 */
@Injectable()
export class StaysSchedulerService {
  private readonly logger = new Logger(StaysSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stays: StaysService,
  ) {}

  @Cron("*/10 * * * *")
  async sweep(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    await withAdvisoryLock(this.prisma, "stays-sweep", async () => {
      const r = await this.stays.sweep();
      if (r.expired || r.unpaid || r.completed) this.logger.log(`séjours : ${JSON.stringify(r)}`);
    });
  }

  @Cron("17 * * * *")
  async syncCalendars(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    await withAdvisoryLock(this.prisma, "stays-ical", async () => {
      const rows = await this.prisma.staySettings.findMany({
        where: { icalImportUrl: { not: null } },
        select: { propertyId: true },
        take: 2000,
      });
      for (const r of rows) await this.syncOne(r.propertyId).catch(() => {});
    });
  }

  /** Relit le calendrier importé d'un bien et remplace ses fermetures « ICAL ». */
  async syncOne(propertyId: string): Promise<{ ok: boolean; blocks: number; error?: string }> {
    const s = await this.prisma.staySettings.findUnique({ where: { propertyId }, select: { icalImportUrl: true } });
    if (!s?.icalImportUrl) return { ok: false, blocks: 0, error: "ICAL_NO_URL" };
    try {
      const text = await fetchIcal(s.icalImportUrl);
      const today = todayDay();
      const horizon = addDays(today, BOOKING_HORIZON_DAYS + 30);
      const ranges = parseIcal(text).filter((r) => r.end.getTime() > today.getTime() && r.start.getTime() < horizon.getTime());
      await this.prisma.$transaction([
        this.prisma.stayBlock.deleteMany({ where: { propertyId, source: "ICAL" } }),
        this.prisma.stayBlock.createMany({
          data: ranges.map((r) => ({ propertyId, startDate: r.start, endDate: r.end, source: "ICAL" as const })),
        }),
        this.prisma.staySettings.update({ where: { propertyId }, data: { icalSyncedAt: new Date(), icalError: null } }),
      ]);
      return { ok: true, blocks: ranges.length };
    } catch (e) {
      const code = (e as Error)?.message?.startsWith("ICAL_") ? (e as Error).message : "ICAL_FETCH_FAILED";
      await this.prisma.staySettings.update({ where: { propertyId }, data: { icalError: code } }).catch(() => {});
      return { ok: false, blocks: 0, error: code };
    }
  }
}
