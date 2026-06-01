import { test, expect } from '@playwright/test';

test('cadastrar um novo curso', async ({ page }) => {
    await page.goto('/dashboard');
});

