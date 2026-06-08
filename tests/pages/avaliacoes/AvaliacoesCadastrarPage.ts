import { Page, expect } from '@playwright/test';

export class AvaliacoesCadastrarPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/avaliacoes/cadastrar');
        await expect(this.page).toHaveURL(/avaliacoes\/cadastrar/);
    }

    async preencherFormulario(avaliacaoDescricao: string, nomeCurso: string) {
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescricao);
        
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option', { name: '1º | ' + nomeCurso + ' |' }).click();
        
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: '1º Bimestre' }).click();
        
        await this.page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
        await this.page.getByRole('option', { name: 'Misturar questões do bloco', exact: true }).click();
        
        await this.page.getByRole('textbox', { name: 'Data de aplicação' }).fill('29/08/2026');
        
        await this.page.locator('div').filter({ hasText: /^Selecionar áreas$/ }).nth(2).click();
        await this.page.getByRole('option', { name: 'Ciências da natureza e suas' }).click();
        
        await this.page.getByRole('button', { name: 'Professor' }).click();
        await this.page.getByRole('option', { name: 'E2e Super Teacher 09' }).click();
        
        await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
        await this.page.getByRole('option', { name: 'Biologia' }).click()
        
        await this.page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill('10');
        
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
        
    }
}