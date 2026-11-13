"use client";
import { useEffect, useRef } from "react";

/**
 * Gentle vertical parallax, transform only. No animation library: a passive scroll listener
 * runs only while the element is near the viewport. Disabled under prefers-reduced-motion.
 */
export function Parallax({
  children,
  distance = 40,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = o.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      i.style.transform = `translate3d(0, ${(distance - 2 * distance * p).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(o);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
