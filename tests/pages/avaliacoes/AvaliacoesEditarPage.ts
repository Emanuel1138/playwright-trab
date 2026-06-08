import { Page, expect } from '@playwright/test';

export class AvaliacoesEditarPage {

    constructor(private page: Page) {}

    async preencherFormulario(avaliacaoDescricao: string) {
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescricao);

        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: '2º Bimestre' }).click();

        await this.page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
        await this.page.getByText('Misturar questões do bloco e').click();

        await this.page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
        await this.page.getByText('(Azul | Branco)').click();

        await this.page.getByRole('textbox', { name: 'Data de aplicação' }).fill('30/08/2026');

        await this.page.getByRole('button', { name: 'Salvar Alterações' }).click();

        await expect(this.page).toHaveURL(/avaliacoes/);
        await expect(this.page.getByText('Avaliação atualizada com sucesso!')).toBeVisible();
    }

}