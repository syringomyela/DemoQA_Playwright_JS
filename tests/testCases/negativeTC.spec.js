const { test, expect } = require('@playwright/test');
import { mainPage } from '../demoQA/pages/pageObject';
import { filler } from '../demoQA/pages/inputs';

// test('Negative scenario', async({page}) => {
   
//     const pageQA = new mainPage(page);

//     await pageQA.goto();
//     await pageQA.fillTextBoxes(
//         filler.name, filler.fakeEmail, filler.currentAddress, filler.permanentAddress
//     );
//     await pageQA.pressSubmit();
    
//     await expect(page.locator('#userEmail')).toHaveClass(/field-error/); //`Name:${filler.name}`

// })