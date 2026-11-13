/** App tour copy. Every figure is illustrative and simulated. */
export const tourLabels = {
  badge: "Zekured · Demo",
  disclaimer: "Simulated money. No real transactions.",
};

export const tabs = ["Home", "Money", "Plan", "Grow", "More"] as const;
export type Tab = (typeof tabs)[number];

export const home = {
  greeting: "Good evening, Amaka",
  headline: "Make room for life.",
  available: { label: "Available to spend", account: "Everyday account", value: 185_400 },
  setAside: { label: "Set aside for life", value: 125_000 },
  invested: { label: "Invested for tomorrow", value: 250_000 },
  activity: [
    { name: "Salary received", date: "12 Nov", amount: 300_000 },
    { name: "Groceries", date: "11 Nov", amount: -18_500 },
    { name: "Electricity", date: "10 Nov", amount: -10_000 },
  ],
  actions: ["Send", "Add money", "Pay bills"],
};

export const money = {
  headline: "Less effort. More living.",
  sub: "Send, receive and keep track in one place.",
  items: ["Upcoming saved reminders", "Card", "Account information", "Demo statement"],
  banking: "Banking by First Option Microfinance Bank Limited.",
};

export const plan = {
  headline: "Give tomorrow a little head start.",
  goals: [
    { name: "Rent", saved: 80_000, target: 600_000, pct: 13, due: "30 Jun 2027" },
    { name: "Emergency fund", saved: 45_000, target: 300_000, pct: 15, due: "31 Dec 2027" },
  ],
  calcTitle: "Monthly plan",
  note: "This is a budget estimate, not your bank balance.",
  fields: [
    { key: "income", label: "Take-home income" },
    { key: "essentials", label: "Essentials" },
    { key: "repayments", label: "Repayments" },
    { key: "savings", label: "Planned savings" },
  ] as const,
};

export const grow = {
  headline: "A future worth building towards.",
  valueLabel: "Illustrative investment value",
  value: 250_000,
  question: "When will you need this money?",
  options: [
    { title: "Money market", text: "Explore liquidity, fees and the possibility of loss." },
    {
      title: "Treasury instruments",
      text: "Understand maturity, reinvestment and early-sale risk.",
    },
    {
      title: "Equities & ETFs",
      text: "Explore market risk and execution through a licensed broker.",
    },
  ],
  manager: "Wealth management by Invest-Trust Asset Management Limited.",
  risk: "Investments can lose value. Returns are not guaranteed.",
};

export const more = {
  tiles: [
    "For your business",
    "Lending for real life",
    "A home of your own",
    "Protect what matters",
    "The money edit",
    "Need a hand?",
    "Know your providers",
    "Demo settings",
  ],
};
