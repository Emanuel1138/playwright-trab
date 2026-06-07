import { Page, expect } from '@playwright/test';
import { AreasPage } from '../pages/AreasPage';

export async function cadastrarArea(page: Page, nomeArea: string) {
    const areas = new AreasPage(page);
    await areas.goto();

    await page.getByRole('button', { name: 'Adicionar área' }).click();
    await page.getByRole('textbox', { name: 'Nome da Área:' }).fill(nomeArea);
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Área salva com sucesso')).toBeVisible();
}