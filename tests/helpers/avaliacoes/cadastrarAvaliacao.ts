import { Page } from '@playwright/test';
import { AvaliacoesCadastrarPage } from '../../pages/avaliacoes/AvaliacoesCadastrarPage';

export async function cadastrarAvaliacao(page: Page, avaliacaoDescricao: string, nomeCurso: string) {
    const avaliacoesCadastrar = new AvaliacoesCadastrarPage(page);

    await avaliacoesCadastrar.goto();

    await avaliacoesCadastrar.preencherFormulario(avaliacaoDescricao, nomeCurso);
}