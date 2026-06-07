import { Page } from '@playwright/test';
import { CursosPage } from '../pages/CursosPage';

export async function cadastrarCurso(page: Page, nomeCurso: string, nivelCurso: string) {
    const cursos = new CursosPage(page);
    await cursos.goto();

    await page.getByRole('button', { name: 'Adicionar Curso' }).click();
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(nomeCurso);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: nivelCurso }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
}