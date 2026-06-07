import { test, expect } from '@playwright/test';

test('CRUD - Curso', async ({ page }) => {
  await page.goto('https://app.avaliei.com.br/dashboard');
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('Marketing');
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Bacharelado' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill('Marketing');
  await expect(page.getByRole('row', { name: /Marketing/ })).toBeVisible();
  await page.getByRole('row', { name: /Marketing/ }).getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('marketing');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
  await page.getByRole('row', { name: /marketing/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();
});

test('Deve permitir criar e editar curso válido', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('Letras');
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Licenciatura' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill('Letras');
  await expect(page.getByRole('row', { name: /Letras/ })).toBeVisible();
  await page.getByRole('row', { name: /Letras/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();
});


test('Não deve permitir criar curso sem preencher o nome', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Pós-Graduação' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Não deve permitir cadastrar curso com nome já existente', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('curso 202606061936');
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Médio' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('O campo nome do curso já está sendo utilizado')).toBeVisible();
});

test('Deve permitir cadastrar curso com nome de 1 caractere', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('w');
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Licenciatura' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill('w');
  await expect(page.getByRole('row', { name: /^w/ })).toBeVisible();
  await page.getByRole('row', { name: /^w/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();
});

test('Deve permitir cadastrar curso com nome de 125 caracteres', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Turmas' }).hover();
  await page.getByRole('link', { name: 'Cursos' }).click();
  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('Curso avançado de programação web com foco em boas práticas de desenvolvimento e arquitetura de sistemas modernos e web hoje!');
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Licenciatura' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
  await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill('curso avançado');
  await expect(page.getByRole('row', { name: /Curso avançado/ })).toBeVisible();
  await page.getByRole('row', { name: /Curso avançado/ }).getByRole('button', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();
});