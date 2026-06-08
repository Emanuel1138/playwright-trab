import { Page } from '@playwright/test';
import { AvaliacoesPage } from '../../pages/avaliacoes/AvaliacoesPage';
import { AvaliacoesEditarPage } from '../../pages/avaliacoes/AvaliacoesEditarPage';

export async function editarAvaliacao(page: Page, avaliacaoDescricao: string) {
    const avaliacoes = new AvaliacoesPage(page);
    const avaliacoesEditar = new AvaliacoesEditarPage(page);

    await avaliacoes.goto()
    ;
    await avaliacoes.abrirEdicao(avaliacaoDescricao);

    await avaliacoesEditar.preencherFormulario(avaliacaoDescricao);
}