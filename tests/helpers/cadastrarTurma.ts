import { Page, expect } from '@playwright/test';
import { TurmasPage } from '../pages/TurmasPage';

export async function cadastrarTurma(page: Page, nomeCurso: string,) {
    const turmas = new TurmasPage(page);
    await turmas.goto();
  
    await page.getByRole('button', { name: 'Adicionar nova turma' }).click();

    await page.getByRole('button', { name: 'Curso' }).click();
    await page.getByRole('option', { name: nomeCurso }).click();

    await page.getByRole('textbox', { name: 'Ano: *' }).fill('2026');

    await page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
    await page.getByLabel('ª Série / 1º Semestre').getByText('ª Série / 1º Semestre').click();

    await page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
    await page.getByRole('option', { name: 'Integral' }).click();

    // await page.getByRole('textbox', { name: 'Sala:' }).fill('07');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();
}