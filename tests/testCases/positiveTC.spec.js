const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/pageObject';
import { filler } from '../demoQA/pages/inputs';

test ('Positive scenario', async ({page}) => {
    
    const pageQA = new mainPage(page);
    const outputName = await page.locator('#output #name').innerText();
    const outputEmail = await page.locator('#output #email').innerText();
    const outputCurrentAddress = await page.locator('#output #currentAddress').innerText();
    const outputPermanentAddress = await page.locator('#output #permanentAddress').innerText();
    

    await pageQA.goto();
    await pageQA.fillTextBoxes(
        filler.name, filler.email, filler.currentAddress, filler.permanentAddress
    );
    await pageQA.pressSubmit();

    await expect(outputName).toBe(`Name:${filler.name}`);
    await expect(outputEmail).toBe(`Email:${filler.email}`);
    await expect(outputCurrentAddress).toBe(`Current Address :${filler.currentAddress}`);
    await expect(outputPermanentAddress).toBe(`Permananet Address :${filler.permanentAddress}`);
});

test('Negative scenario', async({page}) => {

    const pageQA = new mainPage(page);

    await pageQA.goto();
    await pageQA.fillTextBoxes(
        filler.name, filler.fakeEmail, filler.currentAddress, filler.permanentAddress
    );
    await pageQA.pressSubmit();
    await expect(pageQA.locator('class mr-sm-2 field-error form-control').toBeVisible());
})