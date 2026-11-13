import type { Provider } from "./providers";
import type { ProductSlug } from "./products";

/**
 * Product page copy. Headlines, sub-lines and provider facts come from the brief.
 * Benefits, steps and FAQs are PROPOSED copy and need team approval.
 * No rates, fees, returns or eligibility are stated anywhere: those are [TO CONFIRM].
 */
export type ProductPage = {
  slug: ProductSlug;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: { t: string; em?: boolean }[];
  sub: string;
  comingLater?: boolean;
  image: string;
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  ui: { title: string; items: { label: string; detail?: string }[] };
  providerIds: Provider["id"][];
  /** Insurance: legal must approve wording on which party carries the risk. Not rendered. */
  providerNote?: string;
  showInvestRisk?: boolean;
  note: string;
  faqs: { q: string; a: string }[];
};

export const productPages: Record<ProductSlug, ProductPage> = {
  savings: {
    slug: "savings",
    metaTitle: "Savings and goals",
    metaDescription:
      "Set goals, plan your month and give tomorrow a little head start with Zekured savings.",
    eyebrow: "Savings",
    headline: [{ t: "Give tomorrow a " }, { t: "little head start.", em: true }],
    sub: "Set goals, set money aside and keep track, all in one place.",
    image: "young Nigerian woman smiling, holding a phone, blue top",
    benefits: [
      {
        title: "Goals for real life",
        text: "Save for rent, school fees, an emergency fund or a just-in-case buffer.",
      },
      {
        title: "Plan your month",
        text: "See what is left after essentials, repayments and savings before you commit.",
      },
      { title: "Your pace", text: "Choose what to set aside and when, and watch each goal fill." },
    ],
    steps: [
      { title: "Pick a goal", text: "Choose what you are saving for." },
      { title: "Set an amount and date", text: "Decide how much and by when." },
      { title: "Track progress", text: "Watch your goal bar fill as you set money aside." },
    ],
    ui: {
      title: "Your goals",
      items: [
        { label: "Rent", detail: "₦80,000 of ₦600,000" },
        { label: "Emergency fund", detail: "₦45,000 of ₦300,000" },
        { label: "School fees", detail: "Be ready next term" },
        { label: "Just in case", detail: "Create a buffer" },
      ],
    },
    providerIds: ["banking"],
    note: "Any rates or fees will be explained up front before you save.",
    faqs: [
      {
        q: "What can I save for?",
        a: "Rent, school fees, an emergency fund or a buffer for the unexpected. You choose the goal and the date.",
      },
      {
        q: "Who holds my savings?",
        a: "Savings are held by Zekured's licensed banking partner, not by Zekured itself.",
      },
      { q: "When can I start?", a: "The app is launching soon. Join the waitlist to hear first." },
    ],
  },
  investments: {
    slug: "investments",
    metaTitle: "Investments",
    metaDescription:
      "Understand the purpose, the risk and the time you can commit before you invest with Zekured.",
    eyebrow: "Investments",
    headline: [{ t: "A future worth " }, { t: "building towards.", em: true }],
    sub: "Understand the purpose, the risk and the time you can commit.",
    image: "young Nigerian man reviewing his portfolio on a phone",
    benefits: [
      {
        title: "Start with your timeline",
        text: "You choose by when you will need the money, and the options follow.",
      },
      {
        title: "Risks up front",
        text: "Every option explains its risks, fees and the possibility of loss.",
      },
      {
        title: "Licensed partners",
        text: "Investing runs through licensed partners, not through Zekured itself.",
      },
    ],
    steps: [
      { title: "Say when you need it", text: "Pick the time horizon that fits your goal." },
      {
        title: "Read the risks",
        text: "See what the option involves, including fees and possible loss.",
      },
      { title: "Decide with confidence", text: "Invest only if it suits you." },
    ],
    ui: {
      title: "When will you need this money?",
      items: [
        { label: "Money market", detail: "Explore liquidity, fees and the possibility of loss." },
        {
          label: "Treasury instruments",
          detail: "Understand maturity, reinvestment and early-sale risk.",
        },
        {
          label: "Equities & ETFs",
          detail: "Explore market risk and execution through a licensed broker.",
        },
      ],
    },
    providerIds: ["wealth", "execution"],
    showInvestRisk: true,
    note: "Investments can lose value. Returns are not guaranteed.",
    faqs: [
      {
        q: "How do I invest with Zekured?",
        a: "Investing launches with licensed partners. You choose by when you will need the money, and every option explains its risks, fees and the possibility of loss. Returns are not guaranteed.",
      },
      { q: "Can I lose money?", a: "Yes. Investments can lose value. Returns are not guaranteed." },
      {
        q: "Are all investments available at launch?",
        a: "Some investing features arrive after the first release, including securities trading, which depends on a licensed broker partner.",
      },
    ],
  },
  insurance: {
    slug: "insurance",
    metaTitle: "Insurance",
    metaDescription:
      "Compare needs, exclusions and next steps through a licensed insurance broker with Zekured.",
    eyebrow: "Insurance",
    headline: [{ t: "Protect " }, { t: "what matters.", em: true }],
    sub: "Compare needs, exclusions and next steps.",
    image: "Nigerian small-business owner in her shop using a phone",
    benefits: [
      {
        title: "Tailored to you",
        text: "Choose cover that lines up with your circumstances and priorities.",
      },
      { title: "Know the exclusions", text: "See what is and is not covered before you decide." },
      { title: "Clear next steps", text: "Understand what to do if you need to make a claim." },
    ],
    steps: [
      { title: "Tell us what to protect", text: "Start with what matters most to you." },
      { title: "Compare options", text: "Look at needs and exclusions side by side." },
      { title: "Choose and continue", text: "Pick the cover that fits and follow the next steps." },
    ],
    ui: {
      title: "General accident",
      items: [{ label: "Illustrative cover", detail: "₦100,000" }],
    },
    providerIds: ["insurance"],
    // [TO CONFIRM] Which party carries the risk. Do not state it until legal approves.
    providerNote: "[TO CONFIRM] risk-bearing party wording",
    note: "Cover is subject to the policy terms and exclusions, which are shown before you decide.",
    faqs: [
      {
        q: "Who arranges my insurance?",
        a: "Cover is arranged through a licensed insurance broker partner, not by Zekured itself.",
      },
      {
        q: "What should I compare?",
        a: "Your needs, what is excluded, and what the next steps are if something happens.",
      },
      {
        q: "When can I get cover?",
        a: "The app is launching soon. Join the waitlist to hear first.",
      },
    ],
  },
  loans: {
    slug: "loans",
    metaTitle: "Loans",
    metaDescription:
      "Lending for real life is coming later to Zekured. Join the waitlist to hear first.",
    eyebrow: "Coming later",
    headline: [{ t: "Lending for " }, { t: "real life.", em: true }],
    sub: "Government workers · Vernaza education.",
    comingLater: true,
    image: "young Nigerian professional reviewing a plan on a phone",
    benefits: [
      {
        title: "Built around real needs",
        text: "Lending designed for everyday life and for education.",
      },
      { title: "Explained up front", text: "Terms will be shown clearly before you decide." },
      {
        title: "Through a licensed partner",
        text: "Lending is provided by a licensed partner, not by Zekured itself.",
      },
    ],
    steps: [
      { title: "Tell us what you need", text: "Start with the purpose." },
      { title: "See the terms", text: "Review the terms once they are available." },
      { title: "Decide", text: "Continue only if it suits you." },
    ],
    ui: {
      title: "Lending for real life",
      items: [{ label: "Government workers" }, { label: "Vernaza education" }],
    },
    providerIds: ["lending"],
    // [TO CONFIRM] rates, fees and eligibility. Nothing is shown until supplied.
    note: "Lending is coming after the first release. Terms will be shown once confirmed.",
    faqs: [
      {
        q: "When will loans be available?",
        a: "Lending arrives after the first release. Join the waitlist to hear first.",
      },
      {
        q: "What will loans cost?",
        a: "Terms will be shown clearly before you decide, once they are available.",
      },
      {
        q: "Who provides the loans?",
        a: "Lending is provided through a licensed partner, not by Zekured itself.",
      },
    ],
  },
};

export const productSlugs = Object.keys(productPages) as ProductSlug[];
