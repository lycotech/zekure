import { faqs } from "@/content/faqs";
import { contact } from "@/content/legal";
import { jsonLd, siteUrl } from "@/lib/site";

/**
 * Organization + WebSite on every page; FAQPage on the home page.
 * Deliberately NO regulated-business schema (FinancialService, licence numbers, etc.) until
 * licences are confirmed.
 */
export function SiteJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Zekured",
      url: siteUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: contact.supportEmail,
          telephone: contact.phone,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Zekured",
      url: siteUrl,
      inLanguage: "en-NG",
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
