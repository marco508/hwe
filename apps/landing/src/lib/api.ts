import type { Property, Paginated, PropertyQuery } from "@hwe/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

function qs(params: Record<string, string | number | undefined>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) p.set(k, String(v));
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const publicApi = {
  listProperties: (q: PropertyQuery = {}) =>
    get<Paginated<Property>>(
      `/properties${qs({ ...q } as Record<string, string | number | undefined>)}`
    ),
};
