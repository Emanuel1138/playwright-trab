import { Page, expect } from '@playwright/test';

export class TurmasPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/turmas');
        await expect(this.page).toHaveURL(/turmas/);
    }
}