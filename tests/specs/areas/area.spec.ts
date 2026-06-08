import { test } from '@playwright/test';
import { cadastrarArea } from '../../helpers/areas/cadastrarArea';
import { editarArea } from '../../helpers/areas/editarArea';
import { deletarArea } from '../../helpers/areas/deletarArea';

const nomeArea = `area_${Date.now()}`;
const nomeAreaEditada = nomeArea + '_edited';

test('cadastrar uma nova área', async ({ page }) => {
    await cadastrarArea(page, nomeArea);
});

test('editar uma área existente', async ({ page }) => {
    await editarArea(page, nomeArea, nomeAreaEditada);
});

test('excluir uma área existente', async ({ page }) => {
    await deletarArea(page, nomeAreaEditada);
});