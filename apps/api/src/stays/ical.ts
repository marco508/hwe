import * as dns from "node:dns";
import * as http from "node:http";
import * as https from "node:https";
import * as net from "node:net";
import type { DayRange } from "./stays-rules";

/**
 * CALENDRIERS iCal (RFC 5545), dans les deux sens :
 * - export : les nuits prises sur hwe, à coller dans Airbnb, Booking… ;
 * - import : le calendrier d'une autre plateforme, relu périodiquement.
 *
 * L'import va chercher une URL fournie par l'hôte : protection SSRF stricte
 * (https/http publics seulement, adresses privées refusées AU MOMENT de la
 * connexion — y compris après redirection —, taille et durée bornées).
 */

const DAY_MS = 24 * 3600 * 1000;

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

const ymd = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");

/** Pliage des lignes à 75 octets (RFC 5545 §3.1). */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest, "utf8") > 75) {
    let cut = 75;
    while (Buffer.byteLength(rest.slice(0, cut), "utf8") > 75) cut--;
    out.push(rest.slice(0, cut));
    rest = " " + rest.slice(cut);
  }
  out.push(rest);
  return out.join("\r\n");
}

export interface IcalEvent extends DayRange {
  uid: string;
  summary: string;
}

export function buildIcal(name: string, events: IcalEvent[], now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//hwe//Sejours//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(name)}`,
  ];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${esc(e.uid)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(e.start)}`,
      `DTEND;VALUE=DATE:${ymd(e.end)}`,
      `SUMMARY:${esc(e.summary)}`,
      "TRANSP:OPAQUE",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

/** Valeur d'une date iCal → jour à minuit UTC (DATE ou DATE-TIME : le jour indiqué). */
function parseIcalDay(value: string): Date | null {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(value.trim());
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Plages occupées d'un calendrier iCal (VEVENT DTSTART/DTEND ; DTEND absent :
 * une nuit). Événements annulés ignorés. `max` borne le nombre d'événements.
 */
export function parseIcal(text: string, max = 1000): DayRange[] {
  // Dépliage des lignes continuées (CRLF + espace/tab).
  const unfolded = text.replace(/\r?\n[ \t]/g, "");
  const out: DayRange[] = [];
  let cur: { start?: Date | null; end?: Date | null; cancelled?: boolean } | null = null;
  for (const raw of unfolded.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT") {
      if (cur && cur.start && !cur.cancelled) {
        const end = cur.end && cur.end.getTime() > cur.start.getTime() ? cur.end : new Date(cur.start.getTime() + DAY_MS);
        out.push({ start: cur.start, end });
        if (out.length >= max) break;
      }
      cur = null;
    } else if (cur) {
      const idx = line.indexOf(":");
      if (idx < 0) continue;
      const name = line.slice(0, idx).split(";")[0]!.toUpperCase();
      const value = line.slice(idx + 1);
      if (name === "DTSTART") cur.start = parseIcalDay(value);
      else if (name === "DTEND") cur.end = parseIcalDay(value);
      else if (name === "STATUS" && value.trim().toUpperCase() === "CANCELLED") cur.cancelled = true;
    }
  }
  return out;
}

// ───────────────────────────── Import sécurisé ─────────────────────────────

/** Adresse IP non routable publiquement (privée, boucle, lien local, réservée…). */
export function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number) as [number, number];
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === "::" || v === "::1") return true;
    const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(v);
    if (mapped) return isPrivateAddress(mapped[1]!);
    return /^(fc|fd|fe8|fe9|fea|feb|ff)/.test(v) || v.startsWith("64:ff9b:") || v.startsWith("2001:db8");
  }
  return true;
}

/** URL acceptable pour un import (avant toute résolution DNS). */
export function checkImportUrl(raw: string): URL | null {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  if (u.username || u.password) return null;
  if (u.port && !["80", "443"].includes(u.port)) return null;
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal") || host.endsWith(".local")) return null;
  if (net.isIP(host) && isPrivateAddress(host)) return null;
  return u;
}

/** Résolution DNS qui refuse les adresses privées (appliquée à CHAQUE connexion). */
const safeLookup: net.LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...(options as dns.LookupOptions), all: true }, (err, addresses) => {
    if (err) return (callback as (e: Error | null, a: string, f: number) => void)(err, "", 4);
    const list = (addresses as unknown as dns.LookupAddress[]) ?? [];
    const bad = list.length === 0 || list.some((a) => isPrivateAddress(a.address));
    if (bad) {
      return (callback as (e: Error | null, a: string, f: number) => void)(new Error("ICAL_PRIVATE_ADDRESS"), "", 4);
    }
    if ((options as dns.LookupOptions)?.all) {
      return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    }
    (callback as (e: null, a: string, f: number) => void)(null, list[0]!.address, list[0]!.family);
  });
};

export const ICAL_MAX_BYTES = 2 * 1024 * 1024;
const ICAL_TIMEOUT_MS = 10_000;

/** Télécharge un calendrier iCal (3 redirections max). Lève une Error dont le message est un code. */
export function fetchIcal(raw: string, redirects = 3): Promise<string> {
  const url = checkImportUrl(raw);
  if (!url) return Promise.reject(new Error("ICAL_URL_INVALID"));
  const lib = url.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(
      url,
      {
        lookup: safeLookup,
        timeout: ICAL_TIMEOUT_MS,
        headers: { "User-Agent": "hwe-calendar-sync/1.0", Accept: "text/calendar, text/plain, */*" },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          if (redirects <= 0) return reject(new Error("ICAL_TOO_MANY_REDIRECTS"));
          let next: string;
          try {
            next = new URL(res.headers.location, url).toString();
          } catch {
            return reject(new Error("ICAL_URL_INVALID"));
          }
          return fetchIcal(next, redirects - 1).then(resolve, reject);
        }
        if (status !== 200) {
          res.resume();
          return reject(new Error(`ICAL_HTTP_${status}`));
        }
        let size = 0;
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => {
          size += c.length;
          if (size > ICAL_MAX_BYTES) {
            req.destroy(new Error("ICAL_TOO_LARGE"));
            return;
          }
          chunks.push(c);
        });
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          if (!text.includes("BEGIN:VCALENDAR")) return reject(new Error("ICAL_NOT_CALENDAR"));
          resolve(text);
        });
        res.on("error", reject);
      },
    );
    req.on("timeout", () => req.destroy(new Error("ICAL_TIMEOUT")));
    req.on("error", (e) => reject(e.message?.startsWith("ICAL_") ? e : new Error("ICAL_FETCH_FAILED")));
  });
}
