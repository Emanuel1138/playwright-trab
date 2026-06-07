import { Page, expect } from '@playwright/test';

export class CursosPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/cursos');
        await expect(this.page).toHaveURL(/cursos/);
    }
}