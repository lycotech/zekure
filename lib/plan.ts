export type PlanInputs = {
  income: number;
  essentials: number;
  repayments: number;
  savings: number;
};

export const demoPlan: PlanInputs = {
  income: 450_000,
  essentials: 250_000,
  repayments: 35_000,
  savings: 50_000,
};

/** "Left after your plan" = take-home income minus essentials, repayments and planned savings. */
export const leftAfterPlan = (p: PlanInputs) => p.income - p.essentials - p.repayments - p.savings;

/** Parse a user-typed amount: digits only, capped so the UI cannot overflow. */
export function parseAmount(raw: string): number {
  const n = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? Math.min(n, 999_999_999) : 0;
}
