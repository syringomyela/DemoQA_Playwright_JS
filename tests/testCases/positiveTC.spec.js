const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/pageObject';
import { randomizeEmail, randomizeInput } from '../demoQA/pages/inputs';

test ('Positive scenario', async ({page}) => {
    
    const pageQA = new mainPage(page);
    const name = randomizeInput();
    const email = randomizeEmail();
    const currentAddress = randomizeInput();
    const permanentAddress = randomizeInput();

    await pageQA.goto();
    await pageQA.fillTextBoxes(name, email, currentAddress, permanentAddress);
    await pageQA.pressSubmit();

    const outputName = await page.locator('#output #name').innerText();
    const outputEmail = await page.locator('#output #email').innerText();
    const outputCurrentAddress = await page.locator('#output #currentAddress').innerText();
    const outputPermanentAddress = await page.locator('#output #permanentAddress').innerText();

    expect(outputName).toBe(`Name:${name}`);
    expect(outputEmail).toBe(`Email:${email}`);
    expect(outputCurrentAddress).toBe(`Current Address :${currentAddress}`);
    expect(outputPermanentAddress).toBe(`Permananet Address :${permanentAddress}`);
});