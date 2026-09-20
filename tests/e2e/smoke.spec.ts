import { test, expect } from "@playwright/test";
test("home page renders the student-facing survey experience", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your voice shapes UVA Wise." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Take the survey/ })).toHaveAttribute("href", "#survey");
  await expect(page.getByText("Responses are confidential")).toBeVisible();
});
