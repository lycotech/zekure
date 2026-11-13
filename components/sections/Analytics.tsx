import { analytics } from "@/lib/analytics";

/** Renders nothing unless a self-hosted analytics script is configured. */
export function Analytics() {
  if (!analytics.src) return null;
  return <script defer src={analytics.src} data-domain={analytics.domain || undefined} />;
}
