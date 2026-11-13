export type ProductSlug = "savings" | "investments" | "insurance" | "loans";

export type Product = {
  slug: ProductSlug;
  name: string;
  href: string;
  /** Bright accent for use on black (sparkles, dots). */
  color: string;
  /**
   * Text/link colour for use on white or pale panels. The brand accents green, orange, yellow
   * and cyan fail WCAG contrast on white, so darker shades are used for text. Save keeps
   * the brief's --link-blue.
   */
  linkColor: string;
};

export const products: Record<ProductSlug, Product> = {
  savings: {
    slug: "savings",
    name: "Save",
    href: "/products/savings",
    color: "#F9CD2E",
    linkColor: "#0B48B0",
  },
  investments: {
    slug: "investments",
    name: "Invest",
    href: "/products/investments",
    color: "#00C559",
    linkColor: "#007A38",
  },
  insurance: {
    slug: "insurance",
    name: "Insure",
    href: "/products/insurance",
    color: "#FB5A30",
    linkColor: "#B8340F",
  },
  loans: {
    slug: "loans",
    name: "Lend",
    href: "/products/loans",
    color: "#8B5CF6",
    linkColor: "#6232D4",
  },
};

/** Marquee order per the brief: Invest, Save, Insure, Lend. */
export const marqueeItems = [
  { label: "Invest", color: products.investments.color },
  { label: "Save", color: products.savings.color },
  { label: "Insure", color: products.insurance.color },
  { label: "Lend", color: products.loans.color },
];
