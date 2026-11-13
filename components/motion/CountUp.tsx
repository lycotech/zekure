"use client";
import { useEffect, useRef } from "react";

export function naira(n: number, decimals = 0) {
  const body = Math.abs(n).toLocaleString("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (n < 0 ? "−₦" : "₦") + body;
}

/**
 * Counts a naira value to its target in 800 ms (no animation library, no layout properties).
 * Server HTML holds the final value. `fromZero` counts up from 0 the first time the number
 * scrolls into view; later value changes animate from the previous value.
 */
export function CountUp({
  value,
  decimals = 0,
  fromZero = false,
  className,
}: {
  value: number;
  decimals?: number;
  fromZero?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(fromZero ? 0 : value);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = value;
      el.textContent = naira(value, decimals);
      return;
    }
    let raf = 0;
    let io: IntersectionObserver | undefined;
    const go = () => {
      const from = current.current;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 800);
        current.current = from + (value - from) * (1 - Math.pow(1 - p, 4));
        el.textContent = naira(current.current, decimals);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (fromZero && !seen.current) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          seen.current = true;
          io?.disconnect();
          go();
        }
      });
      io.observe(el);
    } else {
      go();
    }
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [value, decimals, fromZero]);

  return (
    <span ref={ref} className={className}>
      {naira(value, decimals)}
    </span>
  );
}
