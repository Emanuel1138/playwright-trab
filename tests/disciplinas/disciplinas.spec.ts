import { test, expect } from '@playwright/test';
 
test('CRUD - Disciplina', async ({ page }) => {
  await page.goto('https://app.avaliei.com.br/dashboard');
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('Empreendedorismo');
  await page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
  await page.getByRole('option', { name: 'Formação técnica e profissional' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill('Empreendedorismo');
  await expect(page.getByText('Empreendedorismo')).toBeVisible();
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('empreendedorismo');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Disciplina excluída com sucesso')).toBeVisible();
});
 
test('Não deve permitir salvar sem preencher os campos obrigatórios', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Este campo é obrigatório').first()).toBeVisible();
  await expect(page.getByText('Este campo é obrigatório').last()).toBeVisible();
});
 
test('Buscar disciplina com ID inexistente', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).click();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill('1000000');
  await expect(page.getByRole('cell', { name: 'Nenhuma disciplina encontrada.' })).toBeVisible();
});
 
test('Deve permitir salvar e editar disciplina', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('Projeto de Vida');
  await page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
  await page.getByRole('option', { name: 'Linguagens, códigos e suas tecnologias' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill('Projeto de Vida');
  await expect(page.getByText('Projeto de Vida')).toBeVisible();
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('projeto de Vida');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await expect(page.getByText('projeto de Vida')).toBeVisible();
  await page.getByRole('row').filter({ hasText: 'projeto de Vida' }).getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Disciplina excluída com sucesso')).toBeVisible();
});
 
test('Deve permitir cadastrar disciplina com 1 caractere no nome', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('w');
  await page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
  await page.getByLabel('Suggestions').getByText('Matemática e suas tecnologias').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill('w');
  await page.getByRole('row').filter({ hasText: 'w' }).getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir', exact: true }).click();
  await expect(page.getByText('Disciplina excluída com sucesso')).toBeVisible();
});
 
test('Deve permitir cadastrar disciplina no limite de 125 caracteres', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Disciplinas' }).click();
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click();
  await page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill('Disciplina limite cento e vinte e cinco caracteres teste borda sistema avaliacao educacional nome campo validacao limite');
  await page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
  await page.getByRole('option', { name: 'Formação técnica e' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill('Disciplina limite cento');
  await page.getByRole('row').filter({ hasText: 'Disciplina limite cento' }).getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir', exact: true }).click();
  await expect(page.getByText('Disciplina excluída com sucesso')).toBeVisible();
});