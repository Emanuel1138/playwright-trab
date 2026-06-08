import { Page, expect } from '@playwright/test';
import { AreasPage } from '../../pages/AreasPage';

export async function editarArea(page: Page, nomeArea: string, nomeAreaEditada: string) {
    const areas = new AreasPage(page);

    await areas.goto();

    await areas.pesquisarArea(nomeArea);

    await areas.editarArea(nomeAreaEditada);
}