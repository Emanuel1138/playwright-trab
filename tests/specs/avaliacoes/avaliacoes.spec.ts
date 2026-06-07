import { test, expect, Page } from '@playwright/test';
import { AvaliacoesPage } from '../../pages/AvaliacoesPage';
import { cadastrarCurso } from '../../helpers/cadastrarCurso';
import { cadastrarArea } from '../../helpers/cadastrarArea';
import { cadastrarTurma } from '../../helpers/cadastrarTurma';

const nomeCurso = `curso_${Date.now()}`;
const nomeArea = `area_${Date.now()}`;

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
});