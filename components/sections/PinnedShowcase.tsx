"use client";
import { useEffect, useRef } from "react";

/** Desktop only, and only when motion is allowed. Everything else keeps the plain stacked layout. */
const QUERY =
  "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

/**
 * Wraps the section heading and the three product rows. The server HTML is the stacked layout
 * (mobile, no-JS, reduced motion). On desktop, GSAP + ScrollTrigger are loaded on demand, the
 * rows are stacked on top of each other, the section pins and the rows cross-fade as you scroll.
 * Only transform and opacity are animated.
 */
export function PinnedShowcase({
  heading,
  children,
}: {
  heading: React.ReactNode;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let mm: { revert: () => void } | undefined;

    (async () => {
      if (!window.matchMedia(QUERY).matches) return; // never download GSAP on mobile
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Re-measure once web fonts have settled: they change heights above the pin.
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      const m = gsap.matchMedia();
      mm = m;
      m.add(QUERY, () => {
        const root = rootRef.current;
        const stage = stageRef.current;
        if (!root || !stage) return;
        const rows = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll(":scope > .row"));
        if (rows.length < 2) return;

        stage.classList.add("is-pinned");
        gsap.set(rows, { autoAlpha: 0 });
        gsap.set(rows[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top+=88",
            end: () => "+=" + Math.round(window.innerHeight * 1.6),
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        rows.slice(1).forEach((row, i) => {
          tl.to(rows[i], { autoAlpha: 0, duration: 0.4 }, i + 0.6)
            .fromTo(row, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, i + 0.6)
            .fromTo(
              row.querySelectorAll(".slide-card"),
              { x: 60, rotate: 4 },
              { x: 0, rotate: 0, duration: 0.6 },
              i + 0.6,
            );
        });
        tl.to({}, { duration: 0.4 }, rows.length - 1); // short hold on the last row

        return () => stage.classList.remove("is-pinned");
      });
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {heading}
      <div ref={stageRef} className="stage mt-16 flex flex-col gap-20 md:gap-28">
        {children}
      </div>
    </div>
  );
}
