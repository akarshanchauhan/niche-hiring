import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Niche HR Platform - Visual & Behavioral Verification', () => {
  test.beforeAll(() => {
    const screenshotDir = path.resolve('docs/screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  test('01 - Dashboard / Home', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Welcome Akarshan')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/01-dashboard.png', fullPage: true });
  });

  test('02 - Step 1: Role Requirement', async ({ page }) => {
    await page.goto('/search/new/requirement');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Tell us about the role')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/02-requirement.png', fullPage: true });
  });

  test('03 - Step 2: Job Description Review', async ({ page }) => {
    await page.goto('/search/new/job-description');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Statistical Economist, Weather Patterns')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/03-job-description.png', fullPage: true });
  });

  test('04 - Step 3: Ideal Candidate Profile', async ({ page }) => {
    await page.goto('/search/new/ideal-profile');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Domain Experience')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/04-ideal-profile.png', fullPage: true });
  });

  test('05 - Step 4: Skill Ranking', async ({ page }) => {
    await page.goto('/search/new/skill-ranking');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Rank the skills that matter most')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/05-skill-ranking.png', fullPage: true });
  });

  test('06 - Step 5: Search Setup', async ({ page }) => {
    await page.goto('/search/new/search-setup');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Set up the search')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/06-search-setup.png', fullPage: true });

    // Open fit explainer modal (Frame 126)
    await page.getByLabel('How percentage fit is calculated').click();
    await expect(page.getByText('How Fit Percentage is Calculated')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/06-fit-explainer-modal.png' });
  });

  test('07 - Step 5.1: Live Searching Progress', async ({ page }) => {
    await page.goto('/search/new/searching');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Searching for candidates')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/07-searching-progress.png', fullPage: true });
  });

  test('08 - Step 6: Candidates List', async ({ page }) => {
    await page.goto('/search/statistical-economist-weather/candidates');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Candidate A')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/08-candidates-list.png', fullPage: true });

    // Open candidate deep-dive drawer
    await page.getByText('Candidate A').first().click();
    await expect(page.getByText('Academic Publications & Citations')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/08-candidate-detail-drawer.png' });
  });

  test('09 - State 8: Stale Data Warning Banner', async ({ page }) => {
    await page.goto('/search/statistical-economist-weather/candidates');
    await page.waitForLoadState('networkidle');

    // Trigger stale state via demo controls
    await page.keyboard.press('Alt+d');
    await page.waitForTimeout(300);
    await page.getByText('Trigger Stale Ranking Banner (Frame 130)').click();
    await page.waitForTimeout(300);

    await expect(page.getByText('Skill ranking changed')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/09-stale-warning-banner.png', fullPage: true });
  });

  test('10 - Demo Controls Drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByText('Demo Controls').click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Reviewer Demo Controls')).toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/10-demo-controls-drawer.png' });
  });

  test('11 - Edit Route without Stepper', async ({ page }) => {
    await page.goto('/search/statistical-economist-weather/job-description');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Back to candidates')).toBeVisible();
    await expect(page.getByText('Edit mode · Updates flag re-run')).toBeVisible();
    // Verify stepper is not present
    await expect(page.locator('nav[aria-label="Search progress stepper"]')).not.toBeVisible();
    await page.screenshot({ path: 'docs/screenshots/11-edit-route-no-stepper.png', fullPage: true });
  });
});
