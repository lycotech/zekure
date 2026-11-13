"use client";
import * as A from "@radix-ui/react-accordion";

export type QA = { q: string; a: string };

/** Radix accordion; panel height animates over 200 ms and the plus rotates to a cross (see globals). */
export function Accordion({ items, dark = false }: { items: QA[]; dark?: boolean }) {
  return (
    <A.Root type="single" collapsible className="divide-y divide-current/15">
      {items.map((it, i) => (
        <A.Item key={it.q} value={`i${i}`} className="py-1">
          <A.Header>
            <A.Trigger className="group flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold">
              {it.q}
              <span
                aria-hidden
                className="text-2xl leading-none transition-transform duration-200 group-data-[state=open]:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </A.Trigger>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-[acc-up_200ms_ease-out] data-[state=open]:animate-[acc-down_200ms_ease-out]">
            <p className={dark ? "pb-4 text-white/75" : "pb-4 text-muted"}>{it.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
