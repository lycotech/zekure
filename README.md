# Zekured marketing site

Public marketing website for Zekured: Next.js (App Router, React Server Components), TypeScript strict, Tailwind CSS 4.
Marketing only: no login, no real balances or transactions. Every product screen is an illustration labelled "Illustrative".

> **Compliance rule:** Zekured is the interface; licensed partners hold the money. Never add a rate, return, licence number
> or deposit-protection claim that is not final wording from the brief. See [Open `[TO CONFIRM]` items](#open-to-confirm-items).

## Setup

```bash
pnpm install
cp .env.example .env.local        # then edit
docker compose up -d              # local Postgres for the waitlist (dev only)
pnpm dev                          # http://localhost:3000
```

| Command                                        | What it does                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm start`       | Develop, production build, serve the build                                                  |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | ESLint, `tsc --noEmit`, Prettier                                                            |
| `pnpm test:e2e`                                | Playwright (desktop and Pixel 7): builds, serves on :3111, runs tests incl. axe WCAG 2.2 AA |

> Next.js here is v16 with Cache Components. Read `node_modules/next/dist/docs/` before changing framework-level code; APIs differ from older versions.

## Environment variables

| Variable                                                    | Purpose                                                                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                              | Postgres for waitlist, contact and careers messages. **Production must be a Nigeria-hosted database** (personal data under the NDPA). |
| `DATABASE_SSL`                                              | `true` if the provider requires TLS.                                                                                                  |
| `NEXT_PUBLIC_SITE_URL`                                      | Canonical origin for metadata, sitemap and JSON-LD.                                                                                   |
| `NEXT_PUBLIC_ANALYTICS_SRC`, `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Optional self-hosted, cookieless analytics script. Leave empty for none.                                                              |

Tables (`waitlist`, `messages`) are created on first use by `lib/db.ts`. Do not send waitlist data to offshore form tools or email-marketing services.

## Content editing (no component changes needed)

| To change                                                        | Edit                                                                                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Home copy, features, product rows, section 6                     | `content/home.ts`                                                                                              |
| Products, accent colours, marquee                                | `content/products.ts`                                                                                          |
| Product pages (`/products/*`)                                    | `content/productPages.ts`                                                                                      |
| Partners, regulators, status wording                             | `content/providers.ts`                                                                                         |
| FAQs                                                             | `content/faqs.ts`                                                                                              |
| Footer, contact details, entity disclosure, regulatory paragraph | `content/legal.ts`                                                                                             |
| App tour figures and copy                                        | `content/tour.ts`                                                                                              |
| About page (mission, values, timeline)                           | `content/about.ts`                                                                                             |
| Open roles                                                       | `content/careers.ts`                                                                                           |
| Privacy / Terms headings and text                                | `content/legalPages.ts`                                                                                        |
| Nav menus                                                        | `content/nav.ts`                                                                                               |
| Blog posts                                                       | add `content/blog/<slug>.mdx` with `title`, `description`, `date`, `author` frontmatter; read time is computed |

**Confirming a partner:** in `content/providers.ts` set `status: "confirmed"` and fill `confirmed: { licenceNumber, registerUrl }`.
The Providers page, product pages and home strip switch from the "proposed" wording to the licence number and a register link.

**`[TO CONFIRM]` values never render.** Use `shown()` from `content/legal.ts`; About placeholders are filtered out until filled.

## Fonts and images

- Brand fonts are **Nohemi** (display) and **General Sans** (body). The files are not in the repo and the Nohemi web licence is unconfirmed,
  so `lib/fonts.ts` uses Google stand-ins (Plus Jakarta Sans, DM Sans, Playfair Display italic). To switch, put the files in `public/fonts/`
  and replace the three exports with `next/font/local`, keeping the same CSS variable names.
- Photos are marked placeholders (`ImagePlaceholder`, text `[IMAGE: ...]`). Replace with `next/image`; mark **only the hero image `priority`**.
  Use licensed or commissioned photos of Nigerian people; never download photos of real or public people.
- Colour tokens live in `app/globals.css` (mirrored in `lib/tokens.ts`). Cyan `#29CBEF` is for text and icons on black only; on light
  surfaces use `--ink` or `--link-blue`. Product link colours on white use darker accessible shades (`content/products.ts`).

## Animation

Animate only `transform` and `opacity`; one-off animations 0.4 to 0.8 s; easing `cubic-bezier(0.22, 1, 0.36, 1)`.

- **CSS only:** hero entrance, badge, floating cards, marquee, confetti, page cross-fade (`template.tsx`).
- **Reveal / Stagger:** server components; one shared `RevealObserver` reveals them. Text is in server HTML and is hidden only after JS adds `html.js`.
- **Motion:** used only in the app tour (`components/tour`), which is loaded lazily when it nears the viewport.
- **GSAP + ScrollTrigger:** only the desktop pinned product showcase (`PinnedShowcase`). Loaded on demand and only at
  `(min-width: 1024px) and (min-height: 760px)` with no reduced motion. It is the one library over the 30 KB gzip line, kept because the brief specifies the pinned sequence.
- **Lenis:** smooth scroll, started when idle, off under reduced motion.
- **Reduced motion:** stops marquee, badge, floating cards, parallax, pinning, confetti and Lenis; reveals become a 150 ms fade.
- **Pause controls:** hero ("Pause motion") and marquee ("Pause").

## Performance

Reports from a production build (`pnpm build && pnpm start`), Lighthouse 13, mobile, simulated slow 4G, 4x CPU slowdown, run locally on a dev machine:

| Page                | Perf | A11y | Best practices | SEO | LCP   | TBT    | CLS |
| ------------------- | ---- | ---- | -------------- | --- | ----- | ------ | --- |
| `/`                 | 79   | 100  | 100            | 100 | 3.4 s | 530 ms | 0   |
| `/products/savings` | 87   | 100  | 100            | 100 | 3.3 s | 250 ms | 0   |
| `/providers`        | 88   | 100  | 100            | 100 | 3.1 s | 290 ms | 0   |

Raw reports are in `reports/`. **The performance budget (>= 90, LCP < 2.5 s) is not yet met**; accessibility, best practices, SEO and CLS pass.
Observed (not simulated) LCP under real throttling was about 1.9 s; the lab number is the pessimistic simulation.

What already helps: fully static pages, inline CSS, three font files with two preloads, Motion and GSAP kept out of the initial bundle,
no animation library for reveals, count-up or parallax, `content-visibility` on below-the-fold sections, and a headline that is painted from frame one.

Remaining levers (judgement calls for the team):

1. **Real hero photo:** once a photo exists it becomes the LCP element; serve AVIF/WebP, correct `sizes`, `priority`. Re-measure then.
2. **Brand fonts** self-hosted and subset; the current stand-ins are ~80 KB.
3. **Hydration cost** (React + Next baseline is ~120 KB gzip). Trimming Radix (header and FAQ) would save roughly 15 KB more.
4. **Hosting latency:** the lab model assumes 150 ms RTT. Nigerian hosting and a CDN for static assets should beat it in the field.
5. `font-display: optional` was tried and did not improve the score, so it was reverted.

`lighthouserc.json` runs Lighthouse CI; performance and LCP are `warn` until the budget is met, other categories are `error`.

## Accessibility

WCAG 2.2 AA is checked by axe on every route in CI (`e2e/a11y.spec.ts`), plus keyboard tests for the skip link, header menu, accordion and tabs.
The app tour is a real tablist (roving tabindex, arrow/Home/End). Moving content has pause controls. Touch targets are at least 44 px.

## SEO

Metadata API per page (titles, descriptions, canonicals), `app/opengraph-image.tsx`, `sitemap.xml`, `robots.txt`, `lang="en-NG"`,
JSON-LD: Organization, WebSite, FAQPage (home), Article (blog). **No regulated-business schema** until licences are confirmed.
`/privacy` and `/terms` are `noindex` until the legal team supplies text.

## Deployment

1. Host the app on a Node runtime (or container) **in Nigeria**, and the Postgres database in Nigeria. Static assets may sit behind a CDN.
2. Set the environment variables above; run `pnpm build && pnpm start`.
3. The waitlist rate limiter (`lib/rate-limit.ts`) is in-memory: fine for a single instance. For several instances, move it to the database or Redis.
4. Set up a way to read `waitlist` and `messages` rows (database access or an admin export); the site has no admin UI.

## Open `[TO CONFIRM]` items

Surfaced in code, never shown to visitors:

1. Hero line "Earn interest on your savings and investments with Zekured." (compliance) , `content/home.ts`
2. "comprehensive", "expert guidance", "attractive interest rates" in section 6 , `content/home.ts`
3. Support email: `support@zekured.com` vs `info@coreassetng.com` , `content/legal.ts`
4. Footer entity disclosure: Core Financial Group / Core Asset Management vs Invest-Trust / Core Capital , `content/legal.ts`
5. Legal entity and group relationship (FAQ "What is Zekured?") , `content/faqs.ts`
6. Deposit-protection and safeguarding wording (FAQ "Is my money safe?") , `content/faqs.ts`
7. Insurance: which party carries the risk , `content/productPages.ts`
8. Loans: rates, fees, eligibility; proposed name "Zekured Capital" , `content/productPages.ts`, `content/providers.ts`
9. Stockbroking partner not yet appointed , `content/providers.ts`
10. Licence numbers and register links; proposed vs confirmed status for every partner , `content/providers.ts`
11. Nohemi / General Sans web licence , `lib/fonts.ts`
12. Proposed copy that replaces live-site lorem ipsum, plus all benefit/step/FAQ copy on product pages and the seed blog post (needs team approval)
13. About values and timeline , `content/about.ts`
14. Privacy and Terms text , `content/legalPages.ts`
15. Social media URLs , `content/legal.ts`
