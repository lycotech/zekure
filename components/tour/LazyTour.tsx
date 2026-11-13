"use client";
import { useEffect, useRef, useState } from "react";

type TourComponent = typeof import("./AppTour").AppTour;

function Skeleton() {
  return (
    <div className="mx-auto w-full max-w-[380px]" aria-hidden>
      <div className="mb-3 h-6" />
      <div className="h-[700px] rounded-[44px] border-[10px] border-black bg-white/60" />
    </div>
  );
}

/**
 * Loads the interactive tour (and the animation library it uses) only when it is about to
 * scroll into view. A plain import() is used on purpose: next/dynamic would add a preload for
 * the chunk to every page view. The reserved height prevents layout shift.
 */
export function LazyTour() {
  const ref = useRef<HTMLDivElement>(null);
  const [Tour, setTour] = useState<TourComponent | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("./AppTour").then((m) => {
          if (!cancelled) setTour(() => m.AppTour);
        });
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto min-h-[772px] w-full max-w-[380px]">
      {Tour ? <Tour /> : <Skeleton />}
      {!Tour && <p className="sr-only">Interactive app demo loads as you scroll.</p>}
    </div>
  );
}
