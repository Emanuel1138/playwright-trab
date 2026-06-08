import { Page, expect } from '@playwright/test';

export class AreasPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/areas');
        await expect(this.page).toHaveURL(/areas/);
    }

    async cadastrarArea(nomeArea: string) {
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(nomeArea);
        await this.page.getByRole('button', { name: 'Salvar' }).click();

        await expect(this.page.getByText('Área salva com sucesso')).toBeVisible();
    }

    async editarArea(nomeArea: string, nomeAreaEditada: string) {
        await this.page.getByRole('textbox', { name: 'Pesquisar área...' }).fill(nomeArea);

        await expect(this.page.getByText(nomeArea)).toBeVisible();

        await this.page.getByRole('button', { name: 'Editar' }).click();

        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(nomeAreaEditada);
        await this.page.getByRole('button', { name: 'Salvar' }).click();

        await expect(this.page.getByText('Área salva com sucesso')).toBeVisible();
    }
}