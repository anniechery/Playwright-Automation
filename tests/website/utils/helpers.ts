
import type { Page } from '@playwright/test';

export async function getComputedFontSize(page: Page): Promise<number> {
    const fontSize = await page.evaluate(() => {
        const element = document.querySelector('article')!;
        return window.getComputedStyle(element).fontSize;
    });
    return parseFloat(fontSize);
}