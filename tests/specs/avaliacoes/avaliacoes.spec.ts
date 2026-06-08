import { test, expect } from '@playwright/test';
import { cadastrarAvaliacao } from '../../helpers/avaliacoes/cadastrarAvaliacao';
import { pesquisarAvaliacao } from '../../helpers/avaliacoes/pesquisarAvaliacao';
import { editarAvaliacao } from '../../helpers/avaliacoes/editarAvaliacao';
import { excluirAvaliacao } from '../../helpers/avaliacoes/excluirAvaliacao';
import { cadastrarCurso } from '../../helpers/cadastrarCurso';
import { cadastrarTurma } from '../../helpers/cadastrarTurma';
import { AvaliacoesPage } from '../../pages/avaliacoes/AvaliacoesPage';
import { AvaliacoesCadastrarPage } from '../../pages/avaliacoes/AvaliacoesCadastrarPage';

const nomeCurso = `curso_${Date.now()}`;
const avaliacaoDescricao = `avaliacao_${Date.now()}`;
const avaliacaoDescricaoEditada = avaliacaoDescricao + '_edited';

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
        await cadastrarCurso(page, nomeCurso, 'Licenciatura');
        await cadastrarTurma(page, nomeCurso);
    } finally {
        await page.close();
    }
});

test.describe('Avaliações - Happy Path', () => {

    test('deve cadastrar uma nova avaliação', async ({ page }) => {
        await cadastrarAvaliacao(page, avaliacaoDescricao, nomeCurso);

        await expect(page).toHaveURL(/avaliacoes/);
        await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();
    });

    test('deve pesquisar uma avaliação existente', async ({ page }) => {
        await pesquisarAvaliacao(page, avaliacaoDescricao);
    });

    test('deve editar uma avaliação cadastrada', async ({ page }) => {
        await editarAvaliacao(page, avaliacaoDescricao, avaliacaoDescricaoEditada);
    });

    test('deve excluir uma avaliação cadastrada', async ({ page }) => {
        await excluirAvaliacao(page, avaliacaoDescricaoEditada);
    });

});

test.describe('Avaliações - Sad Path', () => {

    test('cadastrar sem preencher o campo descrição', async ({ page }) => {
        const cadastrarPage = new AvaliacoesCadastrarPage(page);

        await cadastrarPage.goto();

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

        await expect(page.getByText('A descrição é obrigatória')).toBeVisible();
    });

    test('data da aplicação não pode ser anterior ao dia atual', async ({ page }) => {
        const cadastrarPage = new AvaliacoesCadastrarPage(page);

        await cadastrarPage.goto();

        await page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescricao);

        await page.getByRole('combobox', { name: 'Turmas' }).click();
        await page.getByRole('option', { name: '1º | ' + nomeCurso + ' |' }).click();
        
        await page.getByRole('combobox', { name: 'Marcadores' }).click();
        await page.getByRole('option', { name: '1º Bimestre' }).click();
        
        await page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
        await page.getByRole('option', { name: 'Misturar questões do bloco', exact: true }).click();
        
        await page.getByRole('textbox', { name: 'Data de aplicação' }).fill('29/08/2025');
        
        await page.locator('div').filter({ hasText: /^Selecionar áreas$/ }).nth(2).click();
        await page.getByRole('option', { name: 'Ciências da natureza e suas' }).click();
        
        await page.getByRole('button', { name: 'Professor' }).click();
        await page.getByRole('option', { name: 'E2e Super Teacher 09' }).click();
        
        await page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
        await page.getByRole('option', { name: 'Biologia' }).click()
        
        await page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill('10');

        await page.getByRole('button', { name: 'Salvar avaliação' }).click();

        await expect(page.getByText('Data de aplicação não pode ser anterior a hoje')).toBeVisible();
    });

});

test.describe('Avaliações - Edge Cases', () => {

    test('deve cadastrar avaliação com descrição no limite máximo de caracteres', async ({ page }) => {
        const descricaoNoLimite = 'A'.repeat(125);

        await cadastrarAvaliacao(page, descricaoNoLimite, nomeCurso);

        await expect(page).toHaveURL(/avaliacoes/);
        await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();

        // await excluirAvaliacao(page, 'aaaa');
    });

    test('não deve cadastrar avaliação com descrição acima do limite', async ({ page }) => {
        const descricaoAcimadoLimite = 'A'.repeat(126);

        await cadastrarAvaliacao(page, descricaoAcimadoLimite, nomeCurso);

        await expect(page.getByText('O campo descrição não pode ser superior a 125 caracteres')).toBeVisible();
    });

});