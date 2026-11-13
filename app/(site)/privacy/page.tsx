import { LegalShell } from "@/components/sections/LegalShell";
import { privacy } from "@/content/legalPages";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta("Privacy Policy", "How Zekured handles your personal data.", "/privacy"),
  robots: { index: false },
};

export default function PrivacyPage() {
  return <LegalShell {...privacy} />;
}
