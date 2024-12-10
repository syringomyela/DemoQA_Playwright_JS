import { test as nativeTest, expect} from   '@playwright/test';
import { FormPage } from '../pages/sendingFormPage/pageObject.js';
import { Interaction } from '../pages/sendingFormPage/inputs.js';
import { RegisterPage } from '../pages/bookstorePages/registerPage.js';
import { bookstoreEndpoints } from '../pages/bookstorePages/endpoints.js';
import { userAuthentCredsBody } from '../pages/bookstorePages/requests.js';

    
            export const test = nativeTest.extend({
                
        fillFormPage: async ({page}, use) =>{
            const actualPage = new FormPage(page);
            await actualPage.goto('/automation-practice-form');
            await use(actualPage);
        },

        registerAPI : async({page, request }, use) =>{
            const actualPage  = new RegisterPage(page);
            const endpoints = bookstoreEndpoints;
            const data = userAuthentCredsBody();
            const regResponse = await request.post(bookstoreEndpoints.account.user, {data});
            await use({actualPage, data, endpoints, regResponse});
        },

        interaction: async ({page}, use ) => {
            const getMethods = new Interaction(page);
            await use(getMethods);
        },

        generateFormData: async ({ interaction }, use) => {
            const generatedInputData = interaction.generateFormData(10);
            await use(generatedInputData);
        }
    });
    export { expect };