import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator("#tour").scrollIntoViewIfNeeded();
});

test("tour is a proper tab list with five tabs", async ({ page }) => {
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(5);
  await expect(page.getByRole("tab", { name: "Home" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Good evening, Amaka");
  await expect(page.getByText("Simulated money. No real transactions.").first()).toBeVisible();
});

test("tabs switch by click and by keyboard", async ({ page }) => {
  await page.getByRole("tab", { name: "Grow" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("When will you need this money?");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Investments can lose value. Returns are not guaranteed.",
  );

  await page.getByRole("tab", { name: "Grow" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "More" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Demo settings");
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "Home" })).toHaveAttribute("aria-selected", "true");
});

test("hide balances masks figures", async ({ page }) => {
  const toggle = page.getByRole("switch", { name: /hide balances/i });
  await toggle.click();
  await expect(page.getByRole("tabpanel")).toContainText("₦••••••");
  await expect(page.getByRole("tabpanel")).not.toContainText("185,400");
});

test("plan calculator returns ₦115,000 and updates live", async ({ page }) => {
  await page.getByRole("tab", { name: "Plan" }).click();
  const result = page.getByTestId("calc-result");
  await expect(result).toHaveText("₦115,000");
  await expect(page.getByRole("tabpanel")).toContainText(
    "This is a budget estimate, not your bank balance.",
  );

  await page.getByLabel("Planned savings").fill("100000");
  await expect(result).toHaveText("₦65,000");
  await page.getByLabel("Take-home income").fill("300000");
  await expect(result).toHaveText("−₦85,000");
});
