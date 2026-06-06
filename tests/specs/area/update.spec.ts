import { test, expect } from '@playwright/test';

test('Caso Trsite - Update', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome da Área:' }) 
        .fill(''); 
    await page.getByRole('button', { name: 'Salvar' }).click(); 
    await expect( page.getByText('Este campo é obrigatório') ).toBeVisible();
});

test('Caso Feliz - Update', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome da Área:' }) 
        .fill('Design'); 
    await page.getByRole('button', { name: 'Salvar' }).click(); 
    await expect( page.getByText('Área salva com sucesso') ).toBeVisible();
});

test('Caso de Borda - Update', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome da Área:' }) 
        .fill('A'.repeat(1000));
    await page.getByRole('button', { name: 'Salvar' }).click(); 
    await expect( page.getByText('O campo nome da área não pode') ).toBeVisible();
});

test('Caso de Borda - Update - 126 caracteres', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome da Área:' }) 
        .fill('A'.repeat(126)); 
    await page.getByRole('button', { name: 'Salvar' }).click(); 
    await expect( page.getByText('O campo nome da área não pode') ).toBeVisible();
});

