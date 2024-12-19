import { test as nativeTest, expect } from '@playwright/test';
import { FormPage } from '../pages/sendingFormPage/pageObject.js';
import { Interaction } from '../pages/sendingFormPage/inputs.js';
import { userAuthentCredsBody } from '../pages/bookstorePages/requests.js';
import { baseAPIInteraction } from '../pages/bookstorePages/methodsAPI.js';
import dotenv from 'dotenv';

dotenv.config();
   
    export const test = nativeTest.extend({
                
        fillFormPage: async ({page}, use) =>{
            const actualPage = new FormPage(page);
            await actualPage.goto(`${process.env.BASE_URL}/automation-practice-form`);
            await use(actualPage);
        },

        registerAPI : async({page, request : apiRequest }, use) =>{
            const APImethods = new baseAPIInteraction(page, apiRequest);
            const data =  userAuthentCredsBody;
            await APImethods.registerUserRequest();
            await use({ data, APImethods});
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
