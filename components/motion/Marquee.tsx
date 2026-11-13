"use client";
import { useState } from "react";

/** Infinite horizontal scroll, 30 s loop, pauses on hover and via an explicit control. */
export function Marquee({ items }: { items: { label: string; color: string }[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) =>
    items.map((it) => (
      <li
        key={it.label + hidden}
        className="flex items-center gap-4 px-6"
        aria-hidden={hidden || undefined}
      >
        <span className="font-serif text-4xl italic text-white md:text-6xl">{it.label}</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={it.color}
          className="anim-twinkle shrink-0"
          aria-hidden
        >
          <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
        </svg>
      </li>
    ));
  return (
    <div className="marquee relative overflow-hidden bg-black py-8" data-paused={paused}>
      <ul className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </ul>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute right-4 top-1/2 flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/70 px-3 text-xs uppercase tracking-widest text-white"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
