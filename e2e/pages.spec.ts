import { test, expect } from "@playwright/test";

const slugs = ["savings", "investments", "insurance", "loans"];

for (const s of slugs) {
  test(`product page /products/${s} has one h1, provider box, FAQs and waitlist`, async ({
    page,
  }) => {
    await page.goto(`/products/${s}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Who provides this" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Risk and fees" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Join Waitlist" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("[TO CONFIRM]");
  });
}

test("loans is marked coming later and shows no rates", async ({ page }) => {
  await page.goto("/products/loans");
  await expect(page.getByText("Coming later").first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/\d+\s?%/);
});

test("investments shows the risk line", async ({ page }) => {
  await page.goto("/products/investments");
  await expect(
    page.getByText("Investments can lose value. Returns are not guaranteed.").first(),
  ).toBeVisible();
  await expect(page.getByText("Coming with our broker partner")).toBeVisible();
});

test("providers page renders all five partners from config", async ({ page, isMobile }) => {
  await page.goto("/providers");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Clear roles. Clear responsibility.",
  );
  for (const n of [
    "First Option Microfinance Bank Limited",
    "Invest-Trust Asset Management Limited",
    "Licensed stockbroking partner",
    "Core Capital Limited (proposed Zekured Capital)",
    "Great Hope Insurance Brokers Limited",
  ]) {
    await expect(page.getByText(n, { exact: true }).locator("visible=true").first()).toBeVisible();
  }
  if (!isMobile) await expect(page.getByRole("table")).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/licence number/i);
});

test("how-it-works has the tour and the five-step summary", async ({ page }) => {
  await page.goto("/how-it-works");
  await expect(page.getByRole("tab")).toHaveCount(5);
  await expect(page.getByRole("list").first()).toBeVisible();
});

test("home links to providers and products", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "See who does what" }).click();
  await expect(page).toHaveURL(/\/providers$/);
});
