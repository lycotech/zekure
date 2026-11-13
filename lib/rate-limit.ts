import "server-only";

/**
 * Simple in-memory sliding-window limiter. Fine for a single instance; with several
 * instances move this to the database or Redis (noted in the README).
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000)
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return true;
}
