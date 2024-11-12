const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/sendingFormPage/pageObject.js'
import { generateFormData } from '../demoQA/pages/sendingFormPage/inputs.js';
import { gender } from '../demoQA/pages/sendingFormPage/inputs.js';

test.beforeEach(async({page}, testInfo) =>{
    const actualPage = new mainPage(page);
    await actualPage.goto('/automation-practice-form');
    const generatedInputData = generateFormData(10);

    testInfo.data = { actualPage, generatedInputData };
})

test ('Positive scenario, all fields are filled correctly and sent:', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    await actualPage.fillForm(
        generatedInputData.name1, 
        generatedInputData.name2,
        generatedInputData.email,
        generatedInputData.gender, 
        generatedInputData.number, 
        generatedInputData.date, 
        generatedInputData.hobby, 
        generatedInputData.picture, 
        generatedInputData.address, 
        generatedInputData.state, 
        generatedInputData.city 
    )

    await actualPage.pressSubmitButton();
    const actualData = await actualPage.extractTableResult('.modal-body table tbody tr');
    
    const expectedResults =  actualPage.expectedResult(
        generatedInputData.name1, 
        generatedInputData.name2, 
        generatedInputData.email,
        generatedInputData.gender, 
        generatedInputData.number, 
        generatedInputData.date, 
        generatedInputData.hobby, 
        generatedInputData.picture, 
        generatedInputData.address, 
        generatedInputData.state, 
        generatedInputData.city 
    )

    for (const [key, value] of Object.entries(expectedResults)) {
        expect(actualData[key]).toBe(value);  
    }

});

test ('Negative scenario, incorrect value for Email field:', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    
    await actualPage.fillForm(
        generatedInputData.name1, 
        generatedInputData.name2, 
        generatedInputData.name1,
        generatedInputData.gender, 
        generatedInputData.number, 
        generatedInputData.date, 
        generatedInputData.hobby, 
        generatedInputData.picture, 
        generatedInputData.address, 
        generatedInputData.state, 
        generatedInputData.city 
    )

    const emailBoxElement = actualPage.getElementBySelector('#userEmail');
    await actualPage.pressSubmitButton();
    await expect(emailBoxElement).toHaveCSS('border-color', `rgb(220, 53, 69)`); //error marker

});

test ('Negative scenario, incorrect value for Mobile(phone number) field:', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    
    await actualPage.fillForm(
        generatedInputData.name1, 
        generatedInputData.name2,
        generatedInputData.email, 
        generatedInputData.gender,
        '', 
        generatedInputData.date, 
        generatedInputData.hobby, 
        generatedInputData.picture, 
        generatedInputData.address, 
        generatedInputData.state, 
        generatedInputData.city 
    )

    const mobileBoxElement = actualPage.getElementBySelector('#userNumber');
    await actualPage.pressSubmitButton();

    await expect(mobileBoxElement).toHaveCSS('border-color', `rgb(220, 53, 69)`); //error marker

});

test ('Negative scenario, empty fields for name:', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    
    await actualPage.fillForm(
        '', 
        '',
        generatedInputData.email, 
        generatedInputData.gender,
        generatedInputData.number, 
        generatedInputData.date, 
        generatedInputData.hobby, 
        generatedInputData.picture, 
        generatedInputData.address, 
        generatedInputData.state, 
        generatedInputData.city 
    )
    const firstName = actualPage.getElementBySelector('#firstName');
    const lastName = actualPage.getElementBySelector('#lastName');
    await actualPage.pressSubmitButton();

    await expect(firstName).toHaveCSS('border-color', `rgb(220, 53, 69)`);
    await expect(lastName).toHaveCSS('border-color', `rgb(220, 53, 69)`);
});

test ('Negative scenario, sending empty form:', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    
    await actualPage.fillForm(
        '', 
        '', 
        '',
        '', 
        '', 
        '', 
        '', 
        '', 
        '', 
        '', 
        '' 
    )
    const firstName = actualPage.getElementBySelector('#firstName');
    const lastName = actualPage.getElementBySelector('#lastName');
    const mobileBox = actualPage.getElementBySelector('#userNumber');
    await actualPage.pressSubmitButton();
    await expect(firstName).toHaveCSS('border-color', `rgb(220, 53, 69)`);
    await expect(lastName).toHaveCSS('border-color', `rgb(220, 53, 69)`);
    await expect(mobileBox).toHaveCSS('border-color', `rgb(220, 53, 69)`);
    for (const gen of gender) {
        await expect(actualPage.getElementByText(gen)).toHaveCSS('color', `rgb(220, 53, 69)`);
    }


});