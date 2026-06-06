import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

const cursoName = `curso_${Date.now()}`;
const newCursoName = `${cursoName}_edited`;

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

    await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill(cursoName);
    await expect(page.getByText(cursoName)).toBeVisible();
    await expect(page.getByText('Licenciatura')).toBeVisible();
});

test('editar um curso', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();

    await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill(cursoName);
    await expect(page.getByText(cursoName)).toBeVisible();
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(newCursoName);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: 'Bacharelado' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();

    await expect(page.getByText(newCursoName)).toBeVisible();
    await expect(page.getByText('Bacharelado')).toBeVisible();
});

test('excluir um curso', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();

    await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill(newCursoName);
    await expect(page.getByText(newCursoName)).toBeVisible();
    await page.getByRole('button', { name: 'Excluir' }).click();
    await expect(page.getByText('Tem certeza que deseja')).toBeVisible();
    await page.getByRole('button', { name: 'Excluir' }).click();

    await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();

    await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill(newCursoName);
    await expect(page.getByText(newCursoName)).not.toBeVisible();
});

