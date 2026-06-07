import { Page, expect } from '@playwright/test';

export class AreasPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/areas');
        await expect(this.page).toHaveURL(/areas/);
    }
}