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

  async goToTurmas() {
    await this.page.getByRole('button', { name: 'Turmas' }).click();
    await this.page.getByRole('link', { name: 'Turmas' }).click();
    await expect(this.page).toHaveURL(/turmas/);
  }

  async goToAreas() {
    await this.page.getByRole('button', { name: 'Disciplinas' }).click();
    await this.page.getByRole('link', { name: 'Áreas' }).click();
    await expect(this.page).toHaveURL(/areas/);
  }
}