import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

const cursoName = `curso_${Date.now()}`;

test('cadastrar um novo curso', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();

    await page.getByRole('button', { name: 'Adicionar Curso' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(cursoName);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: 'Licenciatura' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
});

test('exibir curso', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();

    await page.getByRole('button', { name: 'ID' }).click();
    await page.getByText('Desc').click();
    await expect(page.getByText(cursoName)).toBeVisible();
});