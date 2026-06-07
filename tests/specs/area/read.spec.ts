import { test, expect } from '@playwright/test';

test('Caso feliz - Read - create', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Pesquisar área...' }) 
        .fill('designer');
    await page.getByRole('button', { name: 'Editar' }).click();
});

test('Caso feliz - Read - edit', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Pesquisar área...' }) 
        .fill('design');
    await page.getByRole('button', { name: 'Editar' }).click();
});