import { test } from '@playwright/test';
import { cadastrarAvaliacao } from '../../helpers/avaliacoes/cadastrarAvaliacao';
import { cadastrarCurso } from '../../helpers/cadastrarCurso';
import { cadastrarTurma } from '../../helpers/cadastrarTurma';
import { editarAvaliacao } from '../../helpers/avaliacoes/editarAvaliacao';
import { excluirAvaliacao } from '../../helpers/avaliacoes/excluirAvaliacao';

const nomeCurso = `curso_${Date.now()}`;
const avaliacaoDescricao = `descricao_${Date.now()}`;
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

test('cadastrar uma nova avaliação', async ({ page }) => { 
    await cadastrarAvaliacao(page, avaliacaoDescricao, nomeCurso);
});

test('editar uma avaliação cadastrada', async ({ page }) => {
    await editarAvaliacao(page, avaliacaoDescricao, avaliacaoDescricaoEditada);
});

test('excluir uma avaliação cadastrada', async ({ page }) => {
    await excluirAvaliacao(page, avaliacaoDescricaoEditada);
});