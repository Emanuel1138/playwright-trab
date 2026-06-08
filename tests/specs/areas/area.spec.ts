import { test, expect } from '@playwright/test';
import { cadastrarArea } from '../../helpers/areas/cadastrarArea';
import { editarArea } from '../../helpers/areas/editarArea';
import { deletarArea } from '../../helpers/areas/deletarArea';
import { pesquisarArea } from '../../helpers/areas/pesquisarArea';

test.describe('Áreas - Happy Path', () => {

    const nomeArea = `area_${Date.now()}`;
    const nomeAreaEditada = nomeArea + '_edited';

    test('deve cadastrar uma nova área', async ({ page }) => {
        await cadastrarArea(page, nomeArea);
        
        await expect(page.getByText('Área salva com sucesso')).toBeVisible();
    });

    test('deve pesquisar uma área existente', async ({ page }) => {
        await pesquisarArea(page, nomeArea);
    });

    test('deve editar uma área existente', async ({ page }) => {
        await editarArea(page, nomeArea, nomeAreaEditada);
    });

    test('deve excluir uma área existente', async ({ page }) => {
        await deletarArea(page, nomeAreaEditada);
    });
  
});

test.describe('Áreas - Sad Path', () => {

    test('não deve cadastrar área com nome vazio', async ({ page }) => {
        await page.goto('/areas');
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
    });

    test('não deve cadastrar área com nome duplicado', async ({ page }) => {
        const nomeDuplicado = 'area_dup_' + Date.now();

        await cadastrarArea(page, nomeDuplicado);

        await cadastrarArea(page, nomeDuplicado);

        await expect(page.getByText('Já existe uma área com o nome')).toBeVisible();
    });

});

test.describe('Áreas - Edge Cases', () => {

    test('deve cadastrar área com nome no limite máximo de caracteres', async ({ page }) => {
        const nomeNoLimite = 'y'.repeat(125);

        await cadastrarArea(page, nomeNoLimite);

        await expect(page.getByText('Área salva com sucesso')).toBeVisible();

        await deletarArea(page, nomeNoLimite);
    });

    test('não deve cadastrar área acima do limite de caracteres', async ({ page }) => {
        const nomeAcimadoLimite = 'A'.repeat(126);

        await cadastrarArea(page, nomeAcimadoLimite);

        await expect(page.getByText('O campo nome da área não pode ser superior a 125 caracteres.')).toBeVisible();
    });

});