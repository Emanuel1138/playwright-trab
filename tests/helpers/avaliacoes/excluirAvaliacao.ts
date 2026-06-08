import { Page } from '@playwright/test';
import { AvaliacoesPage } from '../../pages/avaliacoes/AvaliacoesPage';

export async function excluirAvaliacao(page: Page, avaliacaoDescricao: string) {
    const avaliacoes = new AvaliacoesPage(page);

    await avaliacoes.goto();
    
    await avaliacoes.excluirAvaliacao(avaliacaoDescricao);
}