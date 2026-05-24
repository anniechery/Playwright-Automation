
export async function getComputedFontSize(page: any): Promise<number> {
    const fontSize = await page.evaluate(() => {
        const element = document.querySelector('article')!;
        return window.getComputedStyle(element).fontSize;
    });
    return parseFloat(fontSize);
}