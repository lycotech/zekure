import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  test(`axe WCAG 2.2 AA: ${r}`, async ({ page }) => {
    await page.goto(r);
    // Let reveal animations settle so contrast is measured on final colours.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((res) => setTimeout(res, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      violations.map(
        (v) => `${v.id}: ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`,
      ),
    ).toEqual([]);
  });
}

test("keyboard: skip link and header menu are reachable", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop keyboard check");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const products = page.getByRole("button", { name: /Products/ });
  await products.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: /Savings/ }).first()).toBeVisible();
});
