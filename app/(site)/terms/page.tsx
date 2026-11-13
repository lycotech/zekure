import { LegalShell } from "@/components/sections/LegalShell";
import { terms } from "@/content/legalPages";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta("Terms of Use", "The terms for using the Zekured website and app.", "/terms"),
  robots: { index: false },
};

export default function TermsPage() {
  return <LegalShell {...terms} />;
}
