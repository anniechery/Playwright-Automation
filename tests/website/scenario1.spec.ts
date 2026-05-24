
import test, {Page, expect } from '@playwright/test';
import { getComputedFontSize } from './utils/helpers';


 test('Test for Driver licence renewal Page', async ({ page }: { page: Page }) => {
    await page.goto('https://www.service.nsw.gov.au/'); // Navigate to the Service NSW website

    await expect(page.getByRole('heading', { name: 'Welcome to Service NSW' })).toBeVisible(); // Verify that the welcome heading is visible
    await expect(page.getByRole('button', { name: 'Decrease font size' })).toBeDisabled(); // Verify that the 'Decrease font size' button is disabled

    await page.getByLabel('Global header menu').getByRole('link', { name: 'Find services' }).click(); // Click on the 'Find services' link in the global header menu
    await page.getByRole('combobox', { name: 'Search' }).click(); // Click on the search box
    await page.getByRole('combobox', { name: 'Search' }).fill('renew drivers'); // Fill the search box with 'renew drivers'
    await page.getByRole('option', { name: 'renew drivers licence', exact: true }).click(); // Click on the search result for 'renew drivers licence'
    await page.getByRole('link', { name: 'Renew or upgrade a NSW driver' }).click();
    await expect(page.getByRole('heading', { name: 'Renew or upgrade a NSW driver licence' })).toBeVisible(); // Verify that the heading for renewing or upgrading a NSW driver licence is visible

    const licenseButton = page.getByRole('button', { name: 'Renew or upgrade licence' });
    await expect(licenseButton).toBeVisible(); // Verify that the 'Renew licence' button is visible
    await expect(licenseButton).not.toBeDisabled(); // Verify that the 'Renew or upgrade licence' button is not disabled . This is a negative test case to ensure that the button is enabled and can be clicked
    await expect(licenseButton).toHaveAttribute('href', 'https://transport.service.nsw.gov.au/renewLicence/licenceDetails'); // Verify the url for the 'Renew or upgrade licence' button
    const incrFontSizeButton = page.getByRole('button', { name: 'Increase font size' });
    await expect(incrFontSizeButton).toBeEnabled(); // Verify that the 'Increase font size' button is enabled

    const initialFontSize = await getComputedFontSize(page); // Get the initial font size of the article element
    await incrFontSizeButton.click();
    const increasedFontSize = await getComputedFontSize(page); 
    expect(increasedFontSize).toBeGreaterThan(initialFontSize); // Verify that the font size has increased after clicking the 'Increase font size' button 
 });

