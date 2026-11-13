/**
 * Partners behind Zekured. The Providers page, product pages and home strip all read this file.
 *
 * To confirm a partner: set `status: "confirmed"` and fill `confirmed` with the licence number
 * and the regulator's public register URL. The row then shows those instead of the "proposed"
 * wording. Never confirm anything the legal team has not signed off.
 */
export type ProviderStatus = "proposed" | "confirmed";

export type Provider = {
  id: "banking" | "wealth" | "execution" | "lending" | "insurance";
  role: string;
  partner: string;
  regulator: string;
  status: ProviderStatus;
  /** Wording shown while the status is "proposed". */
  proposedText: string;
  /** Extra short badge for product pages (optional). */
  badge?: string;
  /** Required once status is "confirmed". */
  confirmed?: { licenceNumber: string; registerUrl: string };
};

export const providers: Provider[] = [
  {
    id: "banking",
    role: "Banking",
    partner: "First Option Microfinance Bank Limited",
    regulator: "CBN",
    status: "proposed",
    proposedText:
      "Proposed banking provider. Licence, ownership, integration and product permissions to be confirmed before launch.",
  },
  {
    id: "wealth",
    role: "Wealth management",
    partner: "Invest-Trust Asset Management Limited",
    regulator: "SEC",
    status: "proposed",
    proposedText:
      "Fund and portfolio management. Each product and mandate remains subject to applicable permissions and approved terms.",
  },
  {
    id: "execution",
    role: "Securities execution",
    partner: "Licensed stockbroking partner",
    regulator: "SEC / NGX",
    status: "proposed",
    proposedText: "Partner not yet appointed or verified. No securities orders are executed.",
    badge: "Coming with our broker partner",
  },
  {
    id: "lending",
    role: "Lending",
    partner: "Zekured Capital",
    regulator: "CBN",
    status: "proposed",
    proposedText: "Authority and ownership to be confirmed.",
  },
  {
    id: "insurance",
    role: "Insurance brokerage",
    partner: "Great Hope Insurance Brokers Limited",
    regulator: "NAICOM",
    status: "proposed",
    proposedText: "Proposed broker. Licence and insurer panel to be confirmed.",
  },
];

export const providerById = (id: Provider["id"]) => providers.find((p) => p.id === id)!;

export const providersCopy = {
  heading: [{ t: "Clear roles. " }, { t: "Clear responsibility.", em: true }],
  intro:
    "Zekured is the proposed customer interface. It does not claim a separate banking, investment or insurance licence. Integration is not proof of group ownership or approval.",
  closing:
    "Before launch, legal entities, permissions, safeguarding arrangements and complaints channels must be confirmed.",
};
