import { Page, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export async function cadastrarArea(page: Page, nomeArea: string) {
    // const dashboard = new DashboardPage(page);
    // await dashboard.goto();
    // await dashboard.goToAreas();

    await page.getByRole('button', { name: 'Adicionar área' }).click();
    await page.getByRole('textbox', { name: 'Nome da Área:' }).fill(nomeArea);
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Área salva com sucesso')).toBeVisible();
}