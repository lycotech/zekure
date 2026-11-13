/**
 * Legal page shells: headings only. The legal team supplies the text; add `body` (plain paragraphs)
 * to a section and it will render under its heading. Pages stay noindex until text is supplied.
 */
export type LegalSection = { heading: string; body?: string[] };

export const privacy: { title: string; sections: LegalSection[] } = {
  title: "Privacy Policy",
  sections: [
    { heading: "Who we are" },
    { heading: "What information we collect" },
    { heading: "Why we use it" },
    { heading: "Who we share it with" },
    { heading: "How long we keep it" },
    { heading: "Your rights under the Nigeria Data Protection Act" },
    { heading: "Cookies and analytics" },
    { heading: "Contact us" },
  ],
};

export const terms: { title: string; sections: LegalSection[] } = {
  title: "Terms of Use",
  sections: [
    { heading: "About these terms" },
    { heading: "Using this website" },
    { heading: "The Zekured app" },
    { heading: "Partners and regulated services" },
    { heading: "Risk" },
    { heading: "Liability" },
    { heading: "Changes to these terms" },
    { heading: "Contact us" },
  ],
};
