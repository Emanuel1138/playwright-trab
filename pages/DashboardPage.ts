import { Page } from '@playwright/test';

export class DashboardPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
  }

  async goToCursos() {
    await this.page.getByRole('button', { name: 'Turmas' }).click();
    await this.page.getByRole('link', { name: 'Cursos' }).click();
  }

}