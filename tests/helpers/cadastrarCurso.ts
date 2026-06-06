import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export async function cadastrarCurso(page: Page, nome: string, nivel: string) {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.goToCursos();

    await page.getByRole('button', { name: 'Adicionar Curso' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(nome);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: nivel }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
}