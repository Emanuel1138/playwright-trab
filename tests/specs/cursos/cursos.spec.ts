import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

const cursoName = `curso_${Date.now()}`;
const newCursoName = `${cursoName}_edited`;

async function navegarParaCursos(page: Page) {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToCursos();
}

async function pesquisarCurso(page: Page, nome: string) {
    await page.getByRole('textbox', { name: 'Pesquisar curso...' }).fill(nome);
}

async function preencherFormulario(page: Page, nome: string, nivel: string) {
    await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(nome);
    await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
    await page.getByRole('option', { name: nivel }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
}

test('cadastrar um novo curso', async ({ page }) => {
    await test.step('Navegar para a página de cursos', () => 
        navegarParaCursos(page));

    await test.step('Preencher e salvar formulário de cadastro', async () => {
        await page.getByRole('button', { name: 'Adicionar Curso' }).click();
        await preencherFormulario(page, cursoName, 'Licenciatura');
    });

    await test.step('Verificar texto de sucesso', async () => {
        await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
    });
});

test('exibir curso', async ({ page }) => {
    await test.step('Navegar para a página de cursos', () => 
        navegarParaCursos(page));

    await test.step('Pesquisar e verificar curso', async () => {
        await pesquisarCurso(page, cursoName);
        await expect(page.getByText(cursoName)).toBeVisible();
        await expect(page.getByText('Licenciatura')).toBeVisible();
    });
});

test('editar um curso', async ({ page }) => {
    await test.step('Navegar para a página de cursos', () => 
        navegarParaCursos(page));

    await test.step('Pesquisar e abrir formulário de edição', async () => {
        await pesquisarCurso(page, cursoName);
        await expect(page.getByText(cursoName)).toBeVisible();
        await page.getByRole('button', { name: 'Editar' }).click();
    });

    await test.step('Editar e salvar formulário', () =>
        preencherFormulario(page, newCursoName, 'Bacharelado')
    );

    await test.step('Verificar alterações', async () => {
        await expect(page.getByText('Curso salvo com sucesso')).toBeVisible();
        await expect(page.getByText(newCursoName)).toBeVisible();
        await expect(page.getByText('Bacharelado')).toBeVisible();
    });
});

test('excluir um curso', async ({ page }) => {
    await test.step('Navegar para a página de cursos', () => 
        navegarParaCursos(page));

    await test.step('Pesquisar e excluir curso', async () => {
        await pesquisarCurso(page, newCursoName);
        await expect(page.getByText(newCursoName)).toBeVisible();
        await page.getByRole('button', { name: 'Excluir' }).click();
        await expect(page.getByText('Tem certeza que deseja')).toBeVisible();
        await page.getByRole('button', { name: 'Excluir' }).click();
    });

    await test.step('Verificar exclusão', async () => {
        await expect(page.getByText('Curso excluído com sucesso')).toBeVisible();
        await pesquisarCurso(page, newCursoName);
        await expect(page.getByText(newCursoName)).not.toBeVisible();
    });
});