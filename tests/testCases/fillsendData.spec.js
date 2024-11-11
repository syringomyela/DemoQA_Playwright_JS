const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/sendingFormPage/pageObject.js'
import { generateFormData } from '../demoQA/pages/sendingFormPage/inputs.js';

test.beforeEach(async({page}, testInfo) =>{
    const actualPage = new mainPage(page);
    await actualPage.goto();
    const generatedInputData =  generateFormData(10);

    testInfo.data = { actualPage, generatedInputData };
})

test ('Positive scenario, all fields are filled correctly and sent: ', async ({page}, testInfo) => {
    const { actualPage, generatedInputData } = testInfo.data;
    await actualPage.fillForm(
        generatedInputData.name1, generatedInputData.name2, generatedInputData.email, generatedInputData.number, generatedInputData.date, generatedInputData.hobby, generatedInputData.picture, generatedInputData.address, 
    )
    const formatedDate = actualPage.getDate();
    await actualPage.pressSubmitButton();

    await expect(this.page.getByRole("document").toBeVisible())
});

// const rows = await locator('tr');
// const rowCount = await rows.count();
// for (let i = 0; i < rowCount; i++) {
//     const labelCell = await rows.nth(i).locator('td').nth(0).innerText();
//     const valueCell = await rows.nth(i).locator('td').nth(1).innerText();

//     const expectedEntry = expectedData.find(entry => entry.label === labelCell);

//     if (expectedEntry) {

//         expect(valueCell).toBe(expectedEntry.value);
//     }
// }

//Uttar Pradesh (Agra Luckhow Merrut) Haryana (Karnal Panipat) NCR (Delhi Gurgaon Noida) Rajasthan (Jaipur Jaiselmer)
