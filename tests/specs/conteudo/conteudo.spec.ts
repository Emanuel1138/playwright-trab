import { test, expect } from '@playwright/test';

test('CRUD - Conteúdo', async ({ page }) => {
  await page.goto('https://app.avaliei.com.br/dashboard');
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('Ditadura Militar');
  await page.getByRole('button', { name: 'Disciplina' }).click();
  await page.getByRole('option', { name: 'História' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar conteúdo...' }).fill('Ditadura Militar');
  await expect(page.getByRole('row', { name: /Ditadura Militar/ })).toBeVisible();
  await page.getByRole('row', { name: /Ditadura Militar/ }).getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('ditadura Militar');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await page.getByRole('row', { name: /ditadura Militar/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Conteúdo excluído com sucesso')).toBeVisible();
});
 
test('Deve permitir criar e editar conteúdo existente', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('Povos e comunidades tradicionais');
  await page.getByRole('button', { name: 'Disciplina' }).click();
  await page.getByRole('option', { name: 'História' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar conteúdo...' }).fill('Povos e comunidades');
  await expect(page.getByRole('row', { name: /Povos e comunidades/ })).toBeVisible();
  await page.getByRole('row', { name: /Povos e comunidades/ }).getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('Povos e comunidades tradicionais brasileiras');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await expect(page.getByText('Povos e comunidades tradicionais brasileiras')).toBeVisible();
  await page.getByRole('row', { name: /Povos e comunidades tradicionais brasileiras/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Conteúdo excluído com sucesso')).toBeVisible();
});

test('Não deve permitir criar conteúdo sem preencher o nome', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('button', { name: 'Disciplina' }).click();
  await page.getByRole('option', { name: 'Sociologia' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Não deve permitir criar conteúdo sem selecionar disciplina', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('teste');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Deve aceitar nome com apenas números', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('1234567890');
  await page.getByRole('button', { name: 'Disciplina' }).click();
  await page.getByRole('option', { name: 'História' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar conteúdo...' }).fill('1234567890');
  await expect(page.getByRole('row', { name: /1234567890/ })).toBeVisible();
  await page.getByRole('row', { name: /1234567890/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Conteúdo excluído com sucesso')).toBeVisible();
});

test('Deve aceitar nome com 125 caracteres', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Disciplinas' }).hover();
  await page.getByRole('link', { name: 'Conteúdos' }).click();
  await page.getByRole('button', { name: 'Adicionar Conteúdo' }).click();
  await page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill('A escravidão no Brasil durou mais de 300 anos e seus efeitos sociais persistem até hoje em toda a nossa sociedade moderna!!');
  await page.getByRole('button', { name: 'Disciplina' }).click();
  await page.getByRole('option', { name: 'História' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar conteúdo...' }).fill('escrav');
  await expect(page.getByRole('row', { name: /A escravidão/ })).toBeVisible();
  await page.getByRole('row', { name: /A escravidão/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Conteúdo excluído com sucesso')).toBeVisible();
});