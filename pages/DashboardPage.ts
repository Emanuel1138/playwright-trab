import { Page, expect } from '@playwright/test';

export class DashboardPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async goToCursos() {
    await this.page.getByRole('button', { name: 'Turmas' }).click();
    await this.page.getByRole('link', { name: 'Cursos' }).click();
    await expect(this.page).toHaveURL(/cursos/);
  }

}