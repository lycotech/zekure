import { test, expect } from "@playwright/test";

test("every site-map route loads with exactly one h1", async ({ page }) => {
  const routes = [
    "/",
    "/products/savings",
    "/products/investments",
    "/products/insurance",
    "/products/loans",
    "/how-it-works",
    "/providers",
    "/about",
    "/careers",
    "/blog",
    "/blog/before-you-invest-give-your-money-a-job",
    "/contact",
    "/privacy",
    "/terms",
  ];
  for (const r of routes) {
    const res = await page.goto(r);
    expect(res?.status(), r).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }), r).toHaveCount(1);
    await expect(page.locator("body"), r).not.toContainText("[TO CONFIRM]");
  }
});

test("home FAQ accordion opens by keyboard", async ({ page }) => {
  await page.goto("/");
  const q = page.getByRole("button", { name: "What is Zekured?" });
  await q.focus();
  await page.keyboard.press("Enter");
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("Zekured is the interface; the partners hold the licences"),
  ).toBeVisible();
});

test("home has careers and blog cards linking out", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Explore Careers" })).toHaveAttribute(
    "href",
    "/careers",
  );
  await expect(page.getByRole("link", { name: "Go to Blog" })).toHaveAttribute("href", "/blog");
});

test("blog lists the seed post with a 3 min read", async ({ page }) => {
  await page.goto("/blog");
  await expect(
    page.getByRole("link", { name: "Before you invest, give your money a job." }),
  ).toBeVisible();
  await expect(page.getByText("3 min read")).toBeVisible();
  await page.getByRole("link", { name: "Before you invest, give your money a job." }).click();
  await expect(
    page.getByText("Investments can lose value. Returns are not guaranteed.").first(),
  ).toBeVisible();
});

test("about hides unfinished placeholders; legal pages are headings-only shells", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("What makes us tick");
  await expect(
    page.getByText("Zekured aims to provide innovative and accessible financial services").first(),
  ).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
});

test("contact form validates and requires consent", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter your name")).toBeVisible();
  await expect(page.getByText("Enter a valid email address")).toBeVisible();
  await expect(page.getByText("Please tick the box so we can reply to you")).toBeVisible();
});
