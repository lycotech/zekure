"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only cyan glow that follows the cursor (off on touch and under reduced motion),
 * plus a pause control for the always-on hero motion (badge, sparkles, floating cards).
 */
export function HeroEffects() {
  const glow = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = glow.current;
    if (!fine || calm || !el) return;
    const parent = el.parentElement!;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        el.style.transform = `translate(${e.clientX - r.left - 300}px, ${e.clientY - r.top - 300}px)`;
        el.style.opacity = "1";
      });
    };
    const leave = () => (el.style.opacity = "0");
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    glow.current?.parentElement?.setAttribute("data-motion-paused", String(paused));
  }, [paused]);

  return (
    <>
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-300 md:block"
        style={{ background: "radial-gradient(circle, rgba(41,203,239,0.18), transparent 65%)" }}
      />
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute bottom-4 right-4 z-10 flex min-h-11 items-center rounded-full border border-white/30 bg-black/60 px-4 text-xs uppercase tracking-widest text-white"
      >
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </>
  );
}
