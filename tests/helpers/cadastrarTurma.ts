import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export async function cadastrarTurma(page: Page, nomeCurso: string,) {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.goToTurmas();
  
    await page.getByRole('button', { name: 'Adicionar nova turma' }).click();

    await page.getByRole('button', { name: 'Curso' }).click();
    await page.getByRole('option', { name: nomeCurso }).click();

    await page.getByRole('textbox', { name: 'Ano: *' }).fill('2026');

    await page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
    await page.getByLabel('ª Série / 1º Semestre').getByText('ª Série / 1º Semestre').click();

    await page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
    await page.getByRole('option', { name: 'Integral' }).click();

    await page.getByRole('textbox', { name: 'Sala:' }).fill('07');

    await page.getByRole('button', { name: 'Salvar' }).click();
}