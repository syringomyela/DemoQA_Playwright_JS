const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/pageObject';
import { generateTextBoxData } from '../demoQA/pages/inputs';

test.beforeEach(async({page}, testInfo) =>{
    const actualPage = new mainPage(page);
    await actualPage.goto();
    const generatedInputData =  generateTextBoxData(10);

    testInfo.data = { actualPage, generatedInputData };
})


test ('Positive scenario, all textboxes filled with correct data: ', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;

    await actualPage.fillTextBoxes(
        generatedInputData.name, generatedInputData.email, generatedInputData.currentAddress, generatedInputData.permanentAddress
    );
    await actualPage.pressSubmitButton();

    await expect(await actualPage.outputResult().name.innerText())
        .toBe(`Name:${generatedInputData.name}`);
    await expect(await actualPage.outputResult().email.innerText())
        .toBe(`Email:${generatedInputData.email}`);
    await expect(await actualPage.outputResult().currentAddress.innerText())
        .toBe(`Current Address :${generatedInputData.currentAddress}`);
    await expect(await actualPage.outputResult().permanentAddress.innerText())
        .toBe(`Permananet Address :${generatedInputData.permanentAddress}`);
});


test('Negative scenario, using incorrect email input:', async({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    
    const emailBoxElement = actualPage.getElementBySelector('#userEmail');
    
    await actualPage.fillTextBoxes(
        generatedInputData.name, generatedInputData.fakeEmail, generatedInputData.currentAddress, generatedInputData.permanentAddress
    );

    await actualPage.pressSubmitButton();
    
    

    await expect(emailBoxElement).toHaveCSS('border', '1px solid rgb(255, 0, 0)');

})