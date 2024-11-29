import { test, expect } from '../common/fixtures.js';

test('Positive scenario, all fields are filled correctly and sent:', async ({mainPage, generateFormData}) => {

    await mainPage.fillForm(
        generateFormData.name1, 
        generateFormData.name2,
        generateFormData.email,
        generateFormData.gender, 
        generateFormData.number, 
        generateFormData.hobby, 
        generateFormData.picture, 
        generateFormData.address, 
        generateFormData.state, 
        generateFormData.city 
    )
    
    const expectedResults =  mainPage.expectedResult(
        generateFormData.name1, 
        generateFormData.name2, 
        generateFormData.email,
        generateFormData.gender, 
        generateFormData.number, 
        generateFormData.hobby, 
        generateFormData.picture, 
        generateFormData.address, 
        generateFormData.state, 
        generateFormData.city 
    )

    await mainPage.pressSubmitButton();
    const actualData = await mainPage.extractTableResult();
    
    for (const [key, value] of Object.entries(expectedResults)) {
        expect(actualData[key]).toBe(value);  
    }

});

test ('Negative scenario, incorrect value for Email field:', async ({mainPage, generateFormData} ) => {
    const errorIndics = await mainPage.errorIndicators();
    await mainPage.fillForm(
        generateFormData.name1, 
        generateFormData.name2, 
        generateFormData.name1,
        generateFormData.gender, 
        generateFormData.number, 
        generateFormData.hobby, 
        generateFormData.picture, 
        generateFormData.address, 
        generateFormData.state, 
        generateFormData.city 
    )

    const emailBoxElement = mainPage.elementOnPage().emailBox;
    await mainPage.pressSubmitButton();
    await expect(emailBoxElement).toHaveCSS(errorIndics.element, errorIndics.color); //error marker

});

test ('Negative scenario, incorrect value for Mobile(phone number) field:', async ({mainPage, generateFormData}) => {
    const errorIndics = await mainPage.errorIndicators();
    await mainPage.fillForm(
        generateFormData.name1, 
        generateFormData.name2,
        generateFormData.email, 
        generateFormData.gender,
        '',
        generateFormData.hobby, 
        generateFormData.picture, 
        generateFormData.address, 
        generateFormData.state, 
        generateFormData.city 
    )

    const mobileBoxElement = mainPage.elementOnPage().phoneBox;
    await mainPage.pressSubmitButton();

    await expect(mobileBoxElement).toHaveCSS(errorIndics.element, errorIndics.color); //error marker

});

test ('Negative scenario, empty fields for name:', async ({mainPage, generateFormData}, testInfo) => {
    const errorIndics = await mainPage.errorIndicators();
    await mainPage.fillForm(
        '', 
        '',
        generateFormData.email, 
        generateFormData.gender,
        generateFormData.number,
        generateFormData.hobby, 
        generateFormData.picture, 
        generateFormData.address, 
        generateFormData.state, 
        generateFormData.city 
    )
    const firstName = mainPage.elementOnPage().firstNameBox;
    const lastName = mainPage.elementOnPage().lastNameBox;
    await mainPage.pressSubmitButton();

    await expect(firstName).toHaveCSS(errorIndics.element, errorIndics.color);
    await expect(lastName).toHaveCSS(errorIndics.element, errorIndics.color);
});

test.only ('Negative scenario, sending empty form:', async ({mainPage, interaction} ) => {
    const errorIndics = await mainPage.errorIndicators();
    await mainPage.fillForm(
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
    const firstName = mainPage.elementOnPage().firstNameBox;
    const lastName = mainPage.elementOnPage().lastNameBox;
    const mobileBox = mainPage.elementOnPage().phoneBox;
    const genders =  interaction.gender(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    await mainPage.pressSubmitButton();
    await expect(firstName).toHaveCSS(errorIndics.element, errorIndics.color);
    await expect(lastName).toHaveCSS(errorIndics.element, errorIndics.color);
    await expect(mobileBox).toHaveCSS(errorIndics.element, errorIndics.color);
    for (const gen of genders) {
        await expect(mainPage.getElementByText(gen)).toHaveCSS(errorIndics.element, errorIndics.color);
    }


});