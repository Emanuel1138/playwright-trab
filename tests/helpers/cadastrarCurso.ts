import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export async function cadastrarCurso(page: Page, nomeCurso: string, nivelCurso: string) {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.goToCursos();

    await page.getByRole('button', { name: 'Adicionar Curso' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(nomeCurso);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: nivelCurso }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
}