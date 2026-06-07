import { test, expect, Page } from '@playwright/test';
import { AvaliacoesPage } from '../../pages/avaliacoes/AvaliacoesPage';
import { cadastrarCurso } from '../../helpers/cadastrarCurso';
import { cadastrarTurma } from '../../helpers/cadastrarTurma';

const nomeCurso = `curso_${Date.now()}`;
const avaliacaoDescricao = `descricao_${Date.now()}`;

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
        await cadastrarCurso(page, nomeCurso, 'Licenciatura');
        await cadastrarTurma(page, nomeCurso);
    } finally {
        await page.close();
    }
});

test('cadastrar uma nova avaliação', async ({ page }) => { 
    const avaliacoes = new AvaliacoesPage(page);
    await avaliacoes.goto();

    await page.getByRole('button', { name: 'Criar Avaliação' }).click();
    await expect(page).toHaveURL(/cadastrar/);

    await page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescricao);

    await page.getByRole('combobox', { name: 'Turmas' }).click();
    await page.getByRole('option', { name: '1º | ' + nomeCurso + ' |' }).click();

    await page.getByRole('combobox', { name: 'Marcadores' }).click();
    await page.getByRole('option', { name: '1º Bimestre' }).click();

    await page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
    await page.getByRole('option', { name: 'Misturar questões do bloco', exact: true }).click();

    await page.getByRole('textbox', { name: 'Data de aplicação' }).fill('29/08/2026');

    await page.locator('div').filter({ hasText: /^Selecionar áreas$/ }).nth(2).click();
    await page.getByRole('option', { name: 'Ciências da natureza e suas' }).click();

    await page.getByRole('button', { name: 'Professor' }).click();
    await page.getByRole('option', { name: 'E2e Super Teacher 09' }).click();

    await page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
    await page.getByRole('option', { name: 'Biologia' }).click()

    await page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill('10');

    await page.getByRole('button', { name: 'Salvar avaliação' }).click();

    await expect(page).toHaveURL(/avaliacoes/);
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();
});