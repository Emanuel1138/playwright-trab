import { Page, expect } from '@playwright/test';

export class AvaliacoesPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/avaliacoes');
        await expect(this.page).toHaveURL(/avaliacoes/);
    }

    async pesquisarAvaliacao(avaliacaoDescricao: string) {
        await this.page.getByRole('textbox', { name: 'Pesquisar' }).fill(avaliacaoDescricao);
        await this.page.getByRole('button', { name: 'Aplicar' }).click();

        await expect(this.page.getByText(avaliacaoDescricao)).toBeVisible();
    }

    async abrirEdicao(avaliacaoDescricao: string) {
        await this.page.getByRole('button', { name: 'Mais Ações' }).click();
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();

        await expect(this.page).toHaveURL(/avaliacoes\/editar\/\d+/);
    }

    async excluirAvaliacao(avaliacaoDescricao: string) {
        await this.page.getByRole('button', { name: 'Mais Ações' }).click();
        await this.page.getByRole('menuitem', { name: 'Excluir' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();

        await expect(this.page.getByText('Avaliação excluída com sucesso')).toBeVisible();
    }
}