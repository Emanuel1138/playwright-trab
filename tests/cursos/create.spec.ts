import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

test('cadastrar um novo curso', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    await page.getByRole('button', { name: 'Turmas' }).click();
    await page.getByRole('link', { name: 'Cursos' }).click();

    await expect(page).toHaveURL(/cursos/);
    await page.getByRole('button', { name: 'Adicionar Curso' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('música');
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: 'Licenciatura' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
});

