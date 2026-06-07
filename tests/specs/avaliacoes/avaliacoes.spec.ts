import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { cadastrarCurso } from '../../helpers/cadastrarCurso';
import { cadastrarArea } from '../../helpers/cadastrarArea';
import { cadastrarTurma } from '../../helpers/cadastrarTurma';

const nomeCurso = `curso_${Date.now()}`;
const nomeArea = `area_${Date.now()}`;

async function navegarParaAvaliacoes(page: Page) {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToAvaliacoes();
}

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
    await navegarParaAvaliacoes(page);
});