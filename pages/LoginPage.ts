import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {

    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);

    await this.page.getByRole('textbox', { name: 'Senha' }).fill(password);

    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }
}