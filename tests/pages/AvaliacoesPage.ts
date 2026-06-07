import { Page, expect } from '@playwright/test';

export class AvaliacoesPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/avaliacoes');
        await expect(this.page).toHaveURL(/avaliacoes/);
    }
}