"use client";
import { useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { tabs, tourLabels, type Tab } from "@/content/tour";
import { GrowScreen, HomeScreen, MoneyScreen, MoreScreen, PlanScreen } from "./screens";

const screens: Record<Tab, () => React.ReactElement> = {
  Home: HomeScreen,
  Money: MoneyScreen,
  Plan: PlanScreen,
  Grow: GrowScreen,
  More: MoreScreen,
};

/**
 * Phone mockup as a real tab list: roving tabindex, arrow/Home/End keys, labelled panels.
 * Active-tab underline is a shared element (layoutId); screens slide horizontally.
 */
export function AppTour({ initial = "Home" }: { initial?: Tab }) {
  const uid = useId();
  const [active, setActive] = useState<Tab>(initial);
  const [dir, setDir] = useState(1);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (t: Tab, focus = false) => {
    setDir(tabs.indexOf(t) >= tabs.indexOf(active) ? 1 : -1);
    setActive(t);
    if (focus) refs.current[t]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const i = tabs.indexOf(active);
    const next =
      e.key === "ArrowRight"
        ? tabs[(i + 1) % tabs.length]
        : e.key === "ArrowLeft"
          ? tabs[(i + tabs.length - 1) % tabs.length]
          : e.key === "Home"
            ? tabs[0]
            : e.key === "End"
              ? tabs[tabs.length - 1]
              : null;
    if (next) {
      e.preventDefault();
      select(next, true);
    }
  };

  const Screen = screens[active];
  return (
    <MotionConfig reducedMotion="user">
      <div className="on-light mx-auto w-full max-w-[380px]">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="rounded-full bg-ink px-3 py-1 font-medium uppercase tracking-widest text-white">
            {tourLabels.badge}
          </span>
          <span className="rounded-full border border-ink/30 px-3 py-1 font-medium uppercase tracking-widest text-ink">
            Illustrative
          </span>
        </div>

        <div className="rounded-[44px] border-[10px] border-black bg-black shadow-2xl">
          <div className="flex h-[680px] flex-col overflow-hidden rounded-[34px] bg-white text-ink">
            <div className="h-6 shrink-0" aria-hidden />
            <div
              role="tabpanel"
              id={`${uid}-panel`}
              aria-labelledby={`${uid}-tab-${active}`}
              tabIndex={0}
              className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-4 focus-visible:outline-offset-[-3px]"
            >
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: 40 * d, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: -40 * d, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              role="tablist"
              aria-label="App sections"
              onKeyDown={onKey}
              className="grid shrink-0 grid-cols-5 border-t border-ink/10 bg-white"
            >
              {tabs.map((t) => {
                const on = t === active;
                return (
                  <button
                    key={t}
                    ref={(el) => {
                      refs.current[t] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`${uid}-tab-${t}`}
                    aria-selected={on}
                    aria-controls={`${uid}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(t)}
                    className={`relative min-h-14 text-[13px] font-medium ${on ? "text-ink" : "text-[#475467]"}`}
                  >
                    {on && (
                      <motion.span
                        layoutId={`${uid}-underline`}
                        className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-link-blue"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-[#475467]">{tourLabels.disclaimer}</p>
      </div>
    </MotionConfig>
  );
}
