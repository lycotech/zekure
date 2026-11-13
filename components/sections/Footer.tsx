import Link from "next/link";
import { contact, legal, socials } from "@/content/legal";
import { Logo } from "@/components/ui/Logo";
import { Year } from "./Year";

const cols = [
  {
    title: "Products",
    links: [
      { label: "Investment", href: "/products/investments" },
      { label: "Savings", href: "/products/savings" },
      { label: "Insurance", href: "/products/insurance" },
      { label: "Loans", href: "/products/loans" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Resources", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

const linkCls = "inline-flex min-h-11 items-center text-white/75 hover:text-cyan";

export function Footer() {
  return (
    <footer className="cv-auto bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-white/75">{legal.tagline}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                {c.title}
              </h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
              Contact
            </h2>
            <ul>
              <li>
                <a href={`mailto:${contact.supportEmail}`} className={linkCls}>
                  {contact.supportEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneHref}`} className={linkCls}>
                  {contact.phone}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {s.label}
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-white/75">
                      {s.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 max-w-4xl border-t border-white/15 pt-8 text-sm leading-relaxed text-white/60">
          {legal.regulatory}
        </p>
        <p className="mt-4 text-sm text-white/50">
          © <Year /> Zekured. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
