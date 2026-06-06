import { test, expect } from '@playwright/test';

test('Caso feliz - Delete', async ({ page }) => {
    await page.getByRole('button', { name: 'Excluir' }).click(); 
    await page.getByRole('button', { name: 'Excluir' }).click(); 
    await expect( page.getByRole('alert') 
        .filter({ hasText: 'Área excluída com sucesso' }) ).toBeVisible();
});