/**
 * Legal and contact copy. Edit here, not in components.
 * Values marked [TO CONFIRM] are NEVER rendered to visitors (see `shown()`).
 */
export const TO_CONFIRM = "[TO CONFIRM]";

/** Returns the value only if it has been confirmed; otherwise null so nothing renders. */
export const shown = (v: string) => (v.includes(TO_CONFIRM) ? null : v);

export const contact = {
  // [TO CONFIRM] support@zekured.com vs info@coreassetng.com (the live site shows the latter).
  supportEmail: "support@zekured.com",
  phone: "+234 816 500 0409",
  phoneHref: "+2348165000409",
};

/** Social URLs are unknown. Leave "" until supplied; the footer then shows plain text, not a link. */
export const socials = [
  { label: "Instagram", url: "" },
  { label: "Facebook", url: "" },
  { label: "Twitter", url: "" },
  { label: "LinkedIn", url: "" },
];

export const legal = {
  /**
   * Entity conflict, flagged not resolved. Live site: "a product of Core Financial Group,
   * an affiliate of Core Asset Management Ltd (SEC regulated)". Product plan: Invest-Trust
   * Asset Management Limited (wealth) and Core Capital Limited (lending).
   * Do not publish either version until the team confirms which entities apply.
   */
  entityDisclosure: TO_CONFIRM,

  /** Safe interim wording: only restates constraints from the brief, claims no licence. */
  regulatory:
    "Zekured is a digital interface. Banking, investment and insurance services are provided by licensed partners; Zekured does not hold its own banking, investment or insurance licence. Investments can lose value. Returns are not guaranteed.",

  tagline: "Building your financial future for you, one block at a time.",
  investRisk: "Investments can lose value. Returns are not guaranteed.",
};
