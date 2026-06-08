import { test } from '@playwright/test';
import { cadastrarArea } from '../../helpers/areas/cadastrarArea';

const nomeArea = `area_${Date.now()}`;

test('cadastrar uma nova área', async ({ page }) => {
    await cadastrarArea(page, nomeArea);
});