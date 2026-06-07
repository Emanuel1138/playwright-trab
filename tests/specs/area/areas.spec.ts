import { test, expect } from '@playwright/test';
 
test('CRUD - Área', async ({ page }) => {
  await page.goto('https://app.avaliei.com.br/dashboard');
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Pintura');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar área...' }).fill('pintura');
  await expect(page.getByText('Pintura')).toBeVisible();
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('pintura');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await expect(page.getByText('pintura')).toBeVisible();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Área excluída com sucesso')).toBeVisible();
});
 
test('Não deve permitir cadastrar área já existente', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Matematica');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Já existe uma área com o nome')).toBeVisible();
});
 
test('Não deve permitir salvar sem preencher o nome', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
});
 
test('Deve permitir salvar e editar', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Artess');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar área...' }).fill('artes');
  await expect(page.getByText('Artess')).toBeVisible();
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('artess');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await expect(page.getByText('artess')).toBeVisible();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Área excluída com sucesso')).toBeVisible();
});
 
test('Deve permitir cadastrar área com 1 caractere', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('z');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar área...' }).fill('z');
  await page.getByRole('row').filter({ hasText: 'z' }).getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir', exact: true }).click();
  await expect(page.getByText('Área excluída com sucesso')).toBeVisible();
});
 
test('Deve permitir cadastrar área no limite de 125 caracteres', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Áreas' }).click();
  await page.getByRole('button', { name: 'Adicionar área' }).click();
  await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Area limite cento e vinte e cinco caracteres teste borda disciplina sistema avaliacao educacional nome campo validacao abcdef');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Área salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar área...' }).fill('Area limite cento e vinte e cinco caracteres teste borda disciplina sistema avaliacao educacional nome campo validacao abcdef');
  await page.getByRole('row').filter({ hasText: 'Area limite cento e vinte e cinco caracteres teste borda disciplina sistema avaliacao educacional nome campo validacao abcdef' }).getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir', exact: true }).click();
  await expect(page.getByText('Área excluída com sucesso')).toBeVisible();
});