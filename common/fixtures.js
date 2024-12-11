import { test as nativeTest, expect} from   '@playwright/test';
import { FormPage } from '../pages/sendingFormPage/pageObject.js';
import { Interaction } from '../pages/sendingFormPage/inputs.js';
import { RegisterPage } from '../pages/bookstorePages/registerPage.js';
import { userAuthentCredsBody } from '../pages/bookstorePages/requests.js';
import { baseAPIInteraction } from '../pages/bookstorePages/methodsAPI.js';

    
    export const test = nativeTest.extend({
                
        fillFormPage: async ({page}, use) =>{
            const actualPage = new FormPage(page);
            await actualPage.goto('/automation-practice-form');
            await use(actualPage);
        },

        registerAPI : async({page, request : apiRequest }, use) =>{
            const registerPage  = new RegisterPage(page);
            const request = new baseAPIInteraction(page, apiRequest);
            const data =  userAuthentCredsBody();
            await request.registerUserRequest();
            await use({registerPage, data, request});
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