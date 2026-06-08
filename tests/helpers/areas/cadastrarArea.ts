import { Page, expect } from '@playwright/test';
import { AreasPage } from '../../pages/AreasPage';

export async function cadastrarArea(page: Page, nomeArea: string) {
    const areas = new AreasPage(page);

    await areas.goto();

    await areas.cadastrarArea(nomeArea);
}