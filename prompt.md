Role and goal
You are a senior product designer and Next.js engineer. Build the public marketing website for Zekured, a Nigerian digital finance app for saving, investing, insurance and lending. The site must keep the look of the current site at www.zekured.com (black canvas, electric cyan accent, serif italic emphasis, pill buttons) but be far more polished, animated and fast, and it must replace the current placeholder text with the product story in this prompt.
Audience. Nigerian adults aged 22 to 45, mostly on mid-range Android phones and mobile data, including first-time savers and small-business owners. Design mobile first.
Primary action. Join the waitlist for the mobile app, which is "launching soon". Secondary actions: Get Started and Learn more.
Hard constraints
• This is a marketing site only: no login, no real balances, no real transactions. Any product screen you draw is an illustration with simulated naira figures and an "Illustrative" label.
• Do not invent facts: no interest rates, return figures, licence numbers, customer counts or awards. Use the exact wording given here; where a value is unknown, render the marked placeholder [TO CONFIRM] in the code, not on the live page.
• Zekured is the interface; licensed partners hold the money. Never imply Zekured holds its own banking, investment or insurance licence.
Brand and visual style
Keep the identity of www.zekured.com: a black canvas with electric cyan, a serif italic for emphasised words, and rounded pill buttons. The values below were read from the live site's computed styles; treat them as the source of truth and use them as design tokens.
Token
Value
Where it is used
--black
#000000
Nav, hero, marquee strip, footer
--cyan
#29CBEF
Primary buttons, italic emphasis in headlines, sparkle icons
--cyan-tint
#E9FCFF
Floating cards and soft panels
--ink
#101323
Headings on light sections
--on-cyan
#0B1702
Text on cyan buttons
--muted
#667085
Secondary text on light sections
--card-dark
#262626
Dark cards on black
--link-blue
#0B48B0
"Learn more" links for Save
--green / --orange / --yellow
#00C559 / #FB5A30 / #F9CD2E
Per-product accents (Invest, Insure, Save sparkle)
--white
#FFFFFF
Text on black, light section backgrounds
Use a violet for the Lend accent and pick a value that matches the marquee's purple sparkle.
Typography
• Headlines: Playfair Display (400 to 600, italic). Pattern: bold sans words with the key phrase in cyan Playfair italic, for example "Experience Seamless Finance with 100% Digital Convenience".
• Display and UI: Nohemi (Regular, Medium, SemiBold, Bold). Body: General Sans (Regular, Medium). The current site self-hosts both; load them with next/font/local. Confirm the Nohemi licence covers web use; if not, fall back to General Sans.
• Scale (fluid with clamp): hero 44 to 72 px, section headings 32 to 52 px, body 16 to 18 px, labels 12 to 14 px uppercase with letter spacing.
Shape and components
• Buttons are full pills (border radius 32 px). Primary: cyan fill, dark text, 14 to 16 px medium. Secondary: transparent with a white or black 1.5 px outline.
• Photography sits in large rounded containers (about 24 px radius) of young Nigerians using phones. Overlay small "floating cards" with a 1.5 px black outline and a pale cyan or white fill, for example "Portfolio Diversity", "Save for rainy days", "Education Savings" with a Save Now chip, and a "General accident, ₦100,000" card.
• A circular rotating text badge reads "Save · Invest · Insure · Lend" around a cyan four-point sparkle.
• A black marquee strip repeats the words Invest, Save, Insure and Lend in serif italic, each with a small coloured icon.
• Light sections sit in large rounded panels (about 32 px radius) on the black page, so the page alternates black and soft white.
• Product links use the form "Learn more →", coloured by product.
Tech stack and project setup
Use the latest stable Next.js with the App Router and TypeScript in strict mode, and keep the site mostly statically rendered so it loads fast on mobile data.
Concern
Use
Framework
Next.js (App Router), React Server Components by default, client components only where interaction needs them
Styling
Tailwind CSS with the tokens above as CSS variables in globals.css
Animation
Motion (Framer Motion) for component and scroll-reveal animation; GSAP with ScrollTrigger only for the pinned hero and product-showcase sequences
Smooth scroll
Lenis, disabled when the user prefers reduced motion
Accessible primitives
Radix UI (navigation menu, dialog, accordion)
Images and fonts
next/image with AVIF and WebP, next/font/local and next/font/google
Content
MDX files in the repo for the blog and Money Edit lessons; typed config files for products, providers and FAQs
Forms
Server Actions with Zod validation; honeypot field and rate limiting; waitlist saved to a Postgres database
Quality
ESLint, Prettier, Playwright for end-to-end tests, Lighthouse CI in the pipeline
Folder structure
app/
(site)/page.tsx home
(site)/products/[slug]/ savings, investments, insurance, loans
(site)/how-it-works/
(site)/providers/
(site)/about/ careers/ blog/ contact/
(site)/privacy/ terms/
api/ or actions/ waitlist, contact
components/ui components/sections components/motion
content/ products.ts providers.ts faqs.ts blog/*.mdx
lib/ tokens.ts seo.ts analytics.ts
public/ fonts/ images/ og/
Setup steps

1.  Scaffold with create-next-app (TypeScript, Tailwind, App Router, ESLint) and add the dependencies above.
2.  Put the design tokens in globals.css as CSS variables and mirror them in the Tailwind theme.
3.  Load the three font families once in the root layout and expose them as CSS variables.
4.  Build the shared UI first: Button (primary, secondary, link), Pill badge, FloatingCard, SectionHeading with italic cyan emphasis, Marquee, Accordion and Container.
5.  Add a MotionProvider that reads prefers-reduced-motion and switches animation off everywhere.
6.  Deploy so the waitlist database and API run on Nigerian infrastructure, because the waitlist stores personal data (see the Zekured build plan, hosting section). Static assets can sit behind a CDN.
    Site map and page content
    Build these routes. Copy in quotation marks is final wording to use as written; text in square brackets is an instruction to you. Where the live site had lorem ipsum or a mismatched line, the replacement below is proposed copy that the Zekured team must approve before launch.
    Route
    Purpose
    /
    Home: the story, the product tour and the waitlist
    /products/savings
    Savings and goals
    /products/investments
    Grow: investing with intention
    /products/insurance
    Protection through a licensed broker
    /products/loans
    Lending for real life (marked coming later)
    /how-it-works
    The five-tab app tour: Home, Money, Plan, Grow, More
    /providers
    Who is behind your money: partners and regulators
    /about, /careers, /blog, /contact
    Company pages
    /privacy, /terms
    Legal pages [placeholder shells for the legal team to fill]
    Home page, section by section
7.  Header (sticky, black). Logo with the lightning-bolt Z mark. Nav: Products opens a menu with four items: Savings ("Save for rainy days."), Investments ("Invest for your future."), Insurance ("Your protection begins here"), Loans ("Request for a loan."). Company opens: About ("What makes us tick"), Blog ("Read new insights"), Contact. A cyan pill button "Get Started" scrolls to the waitlist. A small announcement chip sits above the hero: "Mobile app launching soon! We're putting some finishing touches."
8.  Hero. Headline: "Experience Seamless Finance with 100% Digital Convenience" (italic cyan on the emphasised words). Sub-line: "Earn interest on your savings and investments with Zekured." [Compliance to confirm this claim.] Primary button "Get Started". Right side: a rounded photo with the rotating "Save · Invest · Insure · Lend" badge and two floating cards ("Portfolio Diversity", "Save for rainy days").
9.  Our goal is simple. Eyebrow "OUR GOAL IS SIMPLE". Heading: "Your go to app for every need". Sub-line: "Make smarter money moves. Empower your finances." Six feature cards, each with an icon:
    • 100% Online Sign up: "Sign up and open an account with us in minutes from your phone."
    • Customer Support: "You can chat with us on the app, slide into our DMs, or send an email."
    • End-to-end security: "Get peace of mind with our strong security systems and trusted partners."
    • Quick Redemption: "Redeeming money should never take more than a few taps."
    • Invest Securely: "Put your money to work through a licensed partner, with the risks and fees explained up front." [Replaces a live-site line about cards that did not match the title.]
    • Instant Notifications: "Feel confident your payment is successful with instant notifications."
10. Simplifying all things money. Heading: "Simplifying all things money". Sub-line: "Make smarter money moves. Empower your finances." Three alternating image-and-text rows, each with a "Learn more →" link to its product page:
    • Invest: "Quick and Easy portfolio Investments". "Invest spare change, invest while you bank, and build a portfolio over time. Returns are not guaranteed." Floating UI: a "My Portfolio" card with an "Invest Now" button.
    • Save: "Save your money, wherever, whenever!" "Whether you're saving for school, a dream vacation, a new car, our variety of savings plans cater to your unique goals." Floating UI: "Education Savings" card with "Save Now".
    • Insure: "Seamlessly protect your future". "Our tailored insurance options allow you to choose coverage that aligns with your circumstances and priorities." Floating UI: "General accident ₦100,000" card with "Save Now" and a "Get Insured" pill.
11. Marquee strip. Black band, infinite horizontal scroll: Invest, Save, Insure, Lend in serif italic with coloured sparkle icons.
12. Building your financial future for you. Heading: "Building your financial future for you". Sub-line: "Secure the bag, get insured, invest in your wealth! We're here to help you grow your wealth and keep your finance game strong." Three cards: "Insurance at your fingertips" ("Safeguard your future and protect what matters most with comprehensive insurance coverage."), "Invest for the future on your terms" ("Explore a world of investment opportunities with expert guidance, empowering you to grow your wealth strategically."), "Create multiple saving plans to make your life goals happen!" ("Start saving for your dreams with our competitive savings accounts that offer attractive interest rates."). [Compliance to confirm "comprehensive", "expert guidance" and "attractive interest rates".]
13. See it in action (new). An interactive phone mockup of the app with five tabs. Detailed in the next section, "The app tour".
14. Who is behind your money (new). A strip of five partner cards linking to /providers. Detailed under "Providers page".
15. FAQ. Accordion, content under "FAQ copy" below. Contact line: "Have a question that is not answered? You can contact us at [TO CONFIRM: support@zekured.com; the live site shows info@coreassetng.com]".
16. Careers and blog. Two cards: "Come Join Us" / "We invite you to explore the exciting career possibilities that await you at Zekured." / button "Explore Careers"; and "Our Blog" / "Take a trip to our blog to get new insights and articles." / button "Go to Blog".
17. Waitlist. Black section. Heading: "Our Mobile app is coming soon". Text: "So what are you waiting for? Join our waitlist to know when we launch our mobile app." Form: first name, email, phone (optional), consent checkbox, button "Join Waitlist". Success state: "You're on the list. We'll tell you the moment the app launches."
18. Footer. Line: "Building your financial future for you, one block at a time." Columns: PRODUCTS (Investment, Savings, Insurance, Loans), COMPANY (About Us, Careers, Resources, Privacy Policy, Terms of Use), CONTACT (support@zekured.com, +234 816 500 0409, Instagram, Facebook, Twitter, LinkedIn). Regulatory paragraph from "Compliance wording" below. Copyright with the current year computed in code.
    The app tour (home section 7 and /how-it-works)
    Build an interactive phone mockup with five tabs. Label it "Zekured · Demo" and "Simulated money. No real transactions." All figures are illustrative.
    Tab
    Content to show
    Home
    "Good evening, Amaka". "Make room for life." Available to spend ₦185,400.00 (Everyday account). Set aside for life ₦125,000. Invested for tomorrow ₦250,000. Recent activity: Salary received +₦300,000 (12 Nov), Groceries −₦18,500 (11 Nov), Electricity −₦10,000 (10 Nov). Buttons: Send, Add money, Pay bills. A "Hide balances" toggle.
    Money
    "Less effort. More living." Send, receive and keep track in one place. Upcoming saved reminders, card, account information, demo statement. Line: "Banking by First Option Microfinance Bank Limited."
    Plan
    "Give tomorrow a little head start." Goals: Rent ₦80,000 of ₦600,000 (13%, due 30 Jun 2027); Emergency fund ₦45,000 of ₦300,000 (15%, due 31 Dec 2027). A live monthly plan calculator: take-home income ₦450,000, essentials ₦250,000, repayments ₦35,000, planned savings ₦50,000 gives "Left after your plan" ₦115,000, with the note "This is a budget estimate, not your bank balance." Visitors can edit the four inputs and watch the result and the bars update.
    Grow
    "A future worth building towards." Illustrative investment value ₦250,000. Question card: "When will you need this money?" Three cards: Money market ("Explore liquidity, fees and the possibility of loss."), Treasury instruments ("Understand maturity, reinvestment and early-sale risk."), Equities & ETFs ("Explore market risk and execution through a licensed broker."). Line: "Wealth management by Invest-Trust Asset Management Limited."
    More
    Tiles: For your business, Lending for real life, A home of your own, Protect what matters, The money edit, Need a hand?, Know your providers, Demo settings.
    The tab switch uses a shared-element transition, the calculator animates numbers with a count-up, and goal bars fill on first view.
    Product pages (/products/*)
    Use one template: hero with headline and illustration, three benefit cards, a three-step "how it works", an illustrative UI card, a "Who provides this" box (partner, regulator, status), a risk and fees note, three FAQs and the waitlist call to action.
    • Savings. Headline: "Give tomorrow a little head start." Show goal cards for Rent, Emergency fund, School fees ("Be ready next term") and Just in case ("Create a buffer"). Provider: First Option Microfinance Bank Limited, regulated by the CBN.
    • Investments. Headline: "A future worth building towards." Text: "Understand the purpose, the risk and the time you can commit." Show the three time-horizon cards. Provider: Invest-Trust Asset Management Limited (SEC); securities execution through a licensed stockbroking partner [not yet appointed; show "coming with our broker partner"]. Risk note: "Investments can lose value. Returns are not guaranteed."
    • Insurance. Headline: "Protect what matters." Text: "Compare needs, exclusions and next steps." Provider: Great Hope Insurance Brokers Limited (NAICOM). [TO CONFIRM wording on which party carries the risk; do not state it until legal approves.]
    • Loans. Headline: "Lending for real life." Sub-line: "Government workers · Vernaza education." Mark the page "Coming later" with a waitlist button. Provider: Core Capital Limited (CBN), proposed as Zekured Capital. [TO CONFIRM: rates, fees, eligibility. Show none until supplied.]
    Providers page (/providers)
    Heading: "Clear roles. Clear responsibility." Intro: "Zekured is the proposed customer interface. It does not claim a separate banking, investment or insurance licence. Integration is not proof of group ownership or approval." Drive the table from content/providers.ts, where each partner has a status of proposed or confirmed.
    Role
    Partner
    Regulator
    Status text while proposed
    Banking
    First Option Microfinance Bank Limited
    CBN
    Proposed banking provider. Licence, ownership, integration and product permissions to be confirmed before launch.
    Wealth management
    Invest-Trust Asset Management Limited
    SEC
    Fund and portfolio management. Each product and mandate remains subject to applicable permissions and approved terms.
    Securities execution
    Licensed stockbroking partner
    SEC / NGX
    Partner not yet appointed or verified. No securities orders are executed.
    Lending
    Core Capital Limited (proposed Zekured Capital)
    CBN
    Authority, ownership and the proposed name change to be confirmed.
    Insurance brokerage
    Great Hope Insurance Brokers Limited
    NAICOM
    Proposed broker. Licence and insurer panel to be confirmed.
    Close with: "Before launch, legal entities, permissions, safeguarding arrangements and complaints channels must be confirmed." When the team sets a partner to confirmed, the row shows its licence number and a link to the regulator's register instead.
    Company pages
    • About. Heading "What makes us tick". Mission: "Zekured aims to provide innovative and accessible financial services to underserved entrepreneurs and individuals in Nigeria." Add a values row and a timeline [placeholders for the team to fill].
    • Careers. Heading "Come Join Us", an open-roles list from a config file, and a general application form.
    • Blog. MDX posts as cards with read time. Seed one post: "Before you invest, give your money a job." (3 min read).
    • Contact. Form plus support@zekured.com and +234 816 500 0409.
    • Privacy and Terms. Shells with headings only; the legal team supplies the text.
    FAQ copy (proposed, needs approval)
    • What is Zekured? "Zekured is a digital finance app that helps people in Nigeria save, invest, get insured and borrow through licensed partners. Zekured is the interface; the partners hold the licences and your money." [TO CONFIRM: legal entity and group relationship.]
    • What can I do with Zekured? "Save towards goals, plan your monthly money, explore investments and compare insurance. Lending and some investing features arrive after the first release."
    • Is my money safe? "Your money is held by licensed partners and your account is protected with encryption and strong sign-in." [TO CONFIRM: deposit-protection and safeguarding wording. Do not mention any insurer of deposits until confirmed.]
    • How do I invest with Zekured? "Investing launches with licensed partners. You choose by when you will need the money, and every option explains its risks, fees and the possibility of loss. Returns are not guaranteed."
    • How do I open an account? "When the app launches, sign up with your phone number, verify your identity with your BVN or NIN, and start in minutes. Join the waitlist to hear first."
    Animation and interaction spec
    Make the site feel alive without making it slow: animate only transform and opacity, keep every one-off animation between 0.4 and 0.8 seconds, and use the easing cubic-bezier(0.22, 1, 0.36, 1) unless a spring is stated. Put the animation code behind small reusable components in components/motion (Reveal, Stagger, Parallax, Marquee, CountUp).
    Where
    Animation
    Tool
    Hero, on load
    Headline reveals word by word (60 ms stagger); the cyan italic words get a cyan underline that sweeps in; photo reveals with a rounded mask and a slight scale from 1.05 to 1; button springs in last
    Motion
    Hero, always on
    The "Save · Invest · Insure · Lend" circular badge rotates once every 20 seconds; sparkles twinkle with a small scale and rotate; floating cards drift 8 px up and down on offset 4 to 6 second loops
    CSS keyframes
    Hero, desktop only
    A soft cyan radial glow follows the cursor; switched off on touch devices
    Motion values
    Header
    Becomes a blurred translucent black bar after 40 px of scroll; menus open with a 160 ms scale and fade
    Motion, Radix
    Sections
    Fade up 24 px once when 20% visible; card grids stagger by 80 ms
    Motion whileInView
    Our goal is simple
    Each feature icon draws or pops in as its card appears
    Motion
    Simplifying all things money
    On desktop, the section pins while the three product rows cross-fade; photos move with a gentle parallax and the floating UI cards slide in from the side with a slight rotation. On mobile it is a normal stacked layout
    GSAP ScrollTrigger, loaded only on desktop
    Marquee
    Invest, Save, Insure, Lend scroll continuously, 30 seconds per loop, pause on hover
    CSS
    App tour
    A shared-element underline slides between tabs; screens slide horizontally; money values count up in 800 ms; goal bars fill on first view; calculator results and bars animate as inputs change
    Motion layoutId, CountUp
    Buttons and links
    Hover lifts 2 px with a faint cyan glow; press scales to 0.97; the arrow in "Learn more →" nudges 4 px right
    CSS and Motion
    FAQ
    Accordion height animates with a 200 ms ease; the plus icon rotates to a cross
    Radix, Motion
    Waitlist
    Field focus gets a cyan ring; success state swaps in with a small confetti of cyan sparkles, 1.2 seconds, once
    Motion
    Page transitions
    200 ms cross-fade between routes
    template.tsx
    Rules
19. The page must be fully readable with JavaScript off or slow. Render all text in the server HTML and apply animated start states from JavaScript or CSS that only hides content once the script has loaded, so the largest paint is never held back.
20. Respect prefers-reduced-motion: stop the marquee, badge and floating cards, replace reveals with an instant or 150 ms fade, and disable Lenis smooth scroll, parallax, pinning and confetti.
21. Never animate layout properties such as width, height or top on long lists; use transform.
22. Add no preloader or splash screen.
    Compliance wording, accessibility, SEO and performance
    These requirements are not optional polish; treat each as a release blocker.
    Compliance wording
    • Entity conflict to flag, not resolve. The live site's footer says Zekured is a product of Core Financial Group, an affiliate of Core Asset Management Ltd, and that investment services come from Core Asset Management Ltd (SEC regulated). The product plan instead names Invest-Trust Asset Management Limited (wealth) and Core Capital Limited (lending). Put the footer disclosure and the provider names in content/legal.ts, ship it with the value [TO CONFIRM], and do not publish either version until the team confirms which entities apply.
    • Show "Investments can lose value. Returns are not guaranteed." wherever investing or returns are mentioned.
    • Label every product screen and figure "Illustrative".
    • Never state an interest rate, return, loan price, licence number or deposit-protection claim unless it is in this prompt as final wording.
    • Never imply Zekured holds a banking, investment or insurance licence of its own.
    Waitlist and privacy
    • Collect only first name, email and an optional phone number. The consent checkbox starts unticked and links to the Privacy Policy.
    • Store waitlist data in a database hosted in Nigeria, because it is personal data under the Nigeria Data Protection Act. Do not send it to offshore form tools or email marketing services.
    • Use privacy-respecting analytics that you can self-host, with no advertising trackers and no cookies before consent.
    Accessibility (WCAG 2.2 AA)
    • Cyan #29CBEF is for text and icons on black only. On white or the pale cyan tint, use --ink or --link-blue; cyan on white fails contrast.
    • Full keyboard use, a skip link, visible focus rings and touch targets of at least 44 px.
    • The phone mockup is a proper tab list with labelled panels, not an image.
    • Moving content that lasts more than 5 seconds (marquee, badge, floating cards) has a pause control and is hidden from screen readers where it only repeats text.
    • Meaningful alt text on photos; form fields have labels and clear error messages.
    SEO
    • Use the Metadata API for titles, descriptions, canonical URLs and Open Graph images generated with next/og; set lang="en-NG".
    • One h1 per page and a logical heading order.
    • Generate sitemap.xml and robots.txt; add JSON-LD for Organization, WebSite and FAQPage, and Article for blog posts. Do not add regulated-business schema that states licences until they are confirmed.
    Performance budget
    Metric
    Target (mobile, throttled 4G)
    Lighthouse performance
    90 or higher
    Lighthouse accessibility, best practices, SEO
    95 or higher
    Largest Contentful Paint
    under 2.5 s
    Cumulative Layout Shift
    under 0.1
    Interaction to Next Paint
    under 200 ms
    JavaScript on the home route
    as small as possible; justify any library over 30 KB gzip
    Serve images as AVIF or WebP with correct sizes, mark only the hero image priority, subset fonts and preload at most two, lazy-load GSAP and everything below the fold, and prefer static generation for every page.
    Deliverables, build order and acceptance checklist
    Before writing code, reply with a short plan and a list of every [TO CONFIRM] item you found in this prompt. Then build in the order below and pause for review after step 4.
    Build order
23. Project scaffold, tokens, fonts, MotionProvider and the shared UI kit.
24. Header, footer, waitlist form and its server action with a Nigerian-hosted database connection (use a local Postgres in development).
25. Home page sections 1 to 6 with real copy and placeholder images.
26. The app tour with the live plan calculator. Pause here for design review.
27. Providers page, product pages and /how-it-works.
28. Company pages, blog with MDX, FAQ and legal shells.
29. Animation pass: the pinned product showcase, parallax, marquee and page transitions.
30. Accessibility, SEO, performance and test pass; fix everything below the acceptance bar.
    Images. Use clearly marked placeholders such as [IMAGE: young Nigerian woman smiling, holding a phone, blue top] with a neutral gradient. The team supplies licensed or commissioned photos of Nigerian people later. Do not download photos of real or public people.
    Deliverables
    • A working Next.js repository that runs with pnpm install && pnpm dev, plus a README covering setup, environment variables, content editing and deployment.
    • content/ files so the team can change products, providers, FAQs and legal text without touching components.
    • Playwright tests for the waitlist form, the app tour tabs, the calculator and navigation.
    • A Lighthouse report that meets the performance budget.
    Acceptance checklist
    [ ] Colours, fonts and shapes match the tokens; the site is recognisably the Zekured of www.zekured.com
    [ ] Every route in the site map exists and every link works
    [ ] Copy matches this prompt exactly; every [TO CONFIRM] is surfaced in the code and not shown to visitors
    [ ] Live calculator returns ₦115,000 for the demo inputs and updates as inputs change
    [ ] Providers page is driven by providers.ts and switches wording when a partner is set to confirmed
    [ ] No unapproved rate, return, licence or deposit-protection claim appears anywhere
    [ ] Animations match the spec and all stop under reduced motion
    [ ] WCAG 2.2 AA checks pass, including keyboard-only use of the menu, accordion, tabs and form
    [ ] Lighthouse mobile meets the budget; no layout shift from fonts or images
    [ ] Waitlist saves to the database, rejects bad input and bots, and requires consent
