import { test, expect } from "@playwright/test";

test("desktop: product showcase pins and cross-fades rows", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const stage = page.locator(".stage");
  await expect(stage).toHaveClass(/is-pinned/, { timeout: 10_000 });
  // Scroll to the exact start of the pinned range so the scrub position is deterministic.
  await page.evaluate(() => {
    const top = document.querySelector(".stage")!.parentElement!.getBoundingClientRect().top;
    window.scrollTo(0, window.scrollY + top - 88);
  });
  await page.waitForTimeout(1200);
  const rows = page.locator(".stage > .row");
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toHaveCSS("opacity", "1");
  await expect(rows.nth(1)).toHaveCSS("opacity", "0");
  // scroll through the pinned range: the last row becomes the visible one
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.7));
  await expect(rows.nth(2)).toHaveCSS("opacity", "1", { timeout: 5000 });
  await expect(rows.nth(0)).toHaveCSS("opacity", "0");
});

test("mobile: showcase stays stacked and no pin is applied", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.locator(".stage").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.locator(".stage")).not.toHaveClass(/is-pinned/);
  for (const i of [0, 1, 2]) await expect(page.locator(".stage > .row").nth(i)).toBeVisible();
});

test("reduced motion: no pinning, no running animations", async ({ browser }) => {
  const ctx = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.locator(".stage").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.locator(".stage")).not.toHaveClass(/is-pinned/);
  const badge = page.locator(".anim-spin").first();
  await expect(badge).toHaveCSS("animation-name", "none");
  await expect(page.locator(".marquee-track")).toHaveCSS("animation-name", "none");
  await ctx.close();
});

test("hero and marquee pause controls toggle", async ({ page }) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause motion" });
  await pause.click();
  await expect(page.locator("#hero")).toHaveAttribute("data-motion-paused", "true");
  await expect(page.getByRole("button", { name: "Play motion" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const m = page.getByRole("button", { name: "Pause", exact: true });
  await m.scrollIntoViewIfNeeded();
  await m.click();
  await expect(page.locator(".marquee")).toHaveAttribute("data-paused", "true");
});
