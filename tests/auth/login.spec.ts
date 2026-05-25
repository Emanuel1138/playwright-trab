import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('realizar login de usuário a partir de suas credenciais', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.TEST_EMAIL!,
        process.env.TEST_PASSWORD!
    );

    await expect(page).toHaveURL(/2fa-qrcode/);
});

