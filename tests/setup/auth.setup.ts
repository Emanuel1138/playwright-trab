import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { otpGenerate } from '../helpers/otp';
import dotenv from 'dotenv';

setup('realizar login de usuário a partir de suas credenciais', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.TEST_EMAIL!,
        process.env.TEST_PASSWORD!
    );

    await expect(page).toHaveURL(/2fa-codigo/);

    const code = otpGenerate(process.env.MFA_SECRET!);

    await page.getByRole('textbox', { name: 'Código de verificação de 6 dí' }).fill(code);
    await page.getByRole('button', { name: 'Verificar código de autentica' }).click();

     
    await expect(page).toHaveURL(/dashboard/);

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});

