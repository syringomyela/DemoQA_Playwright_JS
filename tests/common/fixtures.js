import { test as baseTest, expect} from   '@playwright/test';
import { mainPage } from '../demoQA/pages/sendingFormPage/pageObject';
import { interaction } from '../demoQA/pages/sendingFormPage/inputs';

    export const test = baseTest.extend({
        mainPage: async ({page}, use) =>{
            const actualPage = new mainPage(page);
            await actualPage.goto('/automation-practice-form');
            await use(actualPage);
        },

        interaction: async ({page}, use ) => {
            const getMethods = new interaction(page);
            await use(getMethods);
        },

        generateFormData: async ({ interaction }, use) => {
            const generatedInputData = interaction.generateFormData(10);
            await use(generatedInputData);
        }
    });
    export { expect};