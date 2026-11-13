"use client";
import { useEffect } from "react";

/**
 * Smooth scroll (Lenis), only when the visitor has not asked for reduced motion, and only
 * once the browser is idle so it never competes with first paint. Motion's own
 * reduced-motion handling lives in AppTour, the only place Motion is used.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let destroy: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.1 });
        const tick = (t: number) => {
          lenis.raf(t);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        destroy = () => lenis.destroy();
      });
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const h = idle ? idle(start) : window.setTimeout(start, 1500);
    return () => {
      cancelled = true;
      if (!idle) clearTimeout(h);
      cancelAnimationFrame(raf);
      destroy?.();
    };
  }, []);
  return <>{children}</>;
}
