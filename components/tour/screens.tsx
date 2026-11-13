"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CountUp, naira } from "@/components/motion/CountUp";
import { demoPlan, leftAfterPlan, parseAmount, type PlanInputs } from "@/lib/plan";
import { grow, home, money, more, plan } from "@/content/tour";

const card = "rounded-2xl bg-[#F2F5F7] p-4";
const sub = "text-[#475467]";
const h = "font-display text-[22px] font-bold leading-tight tracking-tight";

/** Bar that fills on first view using transform only. */
function Bar({ ratio, color = "var(--ink)" }: { ratio: number; color?: string }) {
  const r = Math.max(0, Math.min(1, ratio));
  return (
    <div className="h-2 overflow-hidden rounded-full bg-black/10">
      <motion.div
        className="h-full origin-left rounded-full"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: r }}
        animate={{ scaleX: r }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function Money({ v, d = 0, hidden }: { v: number; d?: number; hidden: boolean }) {
  return hidden ? <span>₦••••••</span> : <CountUp value={v} decimals={d} fromZero />;
}

export function HomeScreen() {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-sm ${sub}`}>{home.greeting}</p>
          <h3 className={h}>{home.headline}</h3>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={hidden}
          onClick={() => setHidden((x) => !x)}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ink/20 px-3 text-xs font-medium"
        >
          Hide balances
          <span
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${hidden ? "bg-ink" : "bg-ink/25"}`}
            aria-hidden
          >
            <span
              className={`h-4 w-4 rounded-full bg-white transition-transform ${hidden ? "translate-x-4" : ""}`}
            />
          </span>
        </button>
      </div>

      <div className="rounded-2xl bg-ink p-5 text-white">
        <p className="text-sm text-white/70">
          {home.available.label} · {home.available.account}
        </p>
        <p className="mt-1 font-display text-3xl font-bold">
          <Money v={home.available.value} d={2} hidden={hidden} />
        </p>
        <div className="mt-4 flex gap-2">
          {home.actions.map((a) => (
            <button
              key={a}
              type="button"
              className="min-h-11 flex-1 rounded-full bg-cyan px-2 text-[13px] font-medium text-on-cyan"
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[home.setAside, home.invested].map((b) => (
          <div key={b.label} className={card}>
            <p className={`text-xs ${sub}`}>{b.label}</p>
            <p className="mt-1 font-display text-lg font-semibold">
              <Money v={b.value} hidden={hidden} />
            </p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Recent activity</h4>
        <ul className="divide-y divide-ink/10">
          {home.activity.map((a) => (
            <li key={a.name} className="flex items-center justify-between py-2.5 text-sm">
              <span>
                {a.name}
                <span className={`block text-xs ${sub}`}>{a.date}</span>
              </span>
              <span className={a.amount > 0 ? "font-medium text-[#007A38]" : "font-medium"}>
                {hidden ? "••••" : `${a.amount > 0 ? "+" : "−"}${naira(Math.abs(a.amount))}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MoneyScreen() {
  return (
    <div className="space-y-4">
      <h3 className={h}>{money.headline}</h3>
      <p className={sub}>{money.sub}</p>
      <ul className="space-y-2">
        {money.items.map((i) => (
          <li
            key={i}
            className={`${card} flex min-h-12 items-center justify-between text-sm font-medium`}
          >
            {i}
            <span aria-hidden className={sub}>
              ›
            </span>
          </li>
        ))}
      </ul>
      <p className={`text-xs ${sub}`}>{money.banking}</p>
    </div>
  );
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-ink/20 bg-white pl-7 pr-3 text-right font-medium focus:border-link-blue focus:outline-none focus:ring-2 focus:ring-link-blue";

export function PlanScreen() {
  const [v, setV] = useState<PlanInputs>(demoPlan);
  const left = leftAfterPlan(v);
  const inc = Math.max(v.income, 1);
  const rows: { label: string; value: number; color: string }[] = [
    { label: "Essentials", value: v.essentials, color: "#101323" },
    { label: "Repayments", value: v.repayments, color: "#6232D4" },
    { label: "Savings", value: v.savings, color: "#0B48B0" },
    { label: "Left", value: Math.max(left, 0), color: "#007A38" },
  ];
  return (
    <div className="space-y-5">
      <h3 className={h}>{plan.headline}</h3>
      <ul className="space-y-3">
        {plan.goals.map((g) => (
          <li key={g.name} className={card}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold">{g.name}</span>
              <span className={sub}>{g.pct}%</span>
            </div>
            <p className={`mb-2 text-xs ${sub}`}>
              {naira(g.saved)} of {naira(g.target)} · due {g.due}
            </p>
            <Bar ratio={g.saved / g.target} color="#0B48B0" />
          </li>
        ))}
      </ul>

      <form
        className={`${card} space-y-3`}
        onSubmit={(e) => e.preventDefault()}
        aria-label={plan.calcTitle}
      >
        <h4 className="text-sm font-semibold">{plan.calcTitle}</h4>
        <div className="rounded-xl bg-ink p-4 text-white" aria-live="polite">
          <p className="text-xs text-white/70">Left after your plan</p>
          <p className="font-display text-2xl font-bold" data-testid="calc-result">
            <CountUp value={left} />
          </p>
          {left < 0 && <p className="mt-1 text-xs text-orange">Your plan is above your income.</p>}
        </div>
        {plan.fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`calc-${f.key}`} className="text-xs font-medium">
              {f.label}
            </label>
            <div className="relative mt-1">
              <span
                aria-hidden
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#475467]"
              >
                ₦
              </span>
              <input
                id={`calc-${f.key}`}
                inputMode="numeric"
                autoComplete="off"
                value={v[f.key].toLocaleString("en-NG")}
                onChange={(e) => setV({ ...v, [f.key]: parseAmount(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>
        ))}
        <ul className="space-y-2" aria-hidden>
          {rows.map((r) => (
            <li key={r.label} className="grid grid-cols-[5.5rem_1fr] items-center gap-2 text-xs">
              <span>{r.label}</span>
              <Bar ratio={r.value / inc} color={r.color} />
            </li>
          ))}
        </ul>
        <p className={`text-xs ${sub}`}>{plan.note}</p>
      </form>
    </div>
  );
}

export function GrowScreen() {
  return (
    <div className="space-y-4">
      <h3 className={h}>{grow.headline}</h3>
      <div className="rounded-2xl bg-ink p-5 text-white">
        <p className="text-sm text-white/70">{grow.valueLabel}</p>
        <p className="mt-1 font-display text-3xl font-bold">
          <CountUp value={grow.value} fromZero />
        </p>
      </div>
      <div className={card}>
        <p className="font-display text-lg font-semibold">{grow.question}</p>
      </div>
      <ul className="space-y-3">
        {grow.options.map((o) => (
          <li key={o.title} className={card}>
            <p className="font-semibold">{o.title}</p>
            <p className={`mt-1 text-sm ${sub}`}>{o.text}</p>
          </li>
        ))}
      </ul>
      <p className={`text-xs ${sub}`}>{grow.manager}</p>
      <p className="text-xs font-medium">{grow.risk}</p>
    </div>
  );
}

export function MoreScreen() {
  return (
    <div className="space-y-4">
      <h3 className={h}>More</h3>
      <ul className="grid grid-cols-2 gap-3">
        {more.tiles.map((t) => (
          <li key={t} className={`${card} flex min-h-20 items-end text-sm font-semibold`}>
            {t === "Know your providers" ? (
              <Link href="/providers" className="underline underline-offset-2">
                {t}
              </Link>
            ) : (
              t
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
