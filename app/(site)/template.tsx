import { RevealObserver } from "@/components/motion/RevealObserver";

/**
 * Re-mounts per route: the CSS gives a 200 ms cross-fade (works without JS, off under reduced
 * motion) and the RevealObserver re-scans the new page's [data-reveal] elements.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-fade">
      <RevealObserver />
      {children}
    </div>
  );
}
