import { test, expect } from '@playwright/test';

test('Caso feliz - Create', async ({ page }) => {
    await page.goto('https://app.avaliei.com.br/dashboard');
    await page.getByRole('link', { name: 'Áreas' }).click();
    await page.getByRole('button', { name: 'Adicionar área' }).click();
    await page.getByRole('textbox', { name: 'Nome da Área:' })
        .fill('Designer');
    await page.getByRole('button', { name: 'Salvar' }).click();
});

