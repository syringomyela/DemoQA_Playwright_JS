import { Page } from 'playwright';

class mainPage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('/text-box');
    }

    async fillTextBoxes(name, email, address1, address2) {
        
        let textBoxIndicator = (id) =>  this.page.locator(id);

        await textBoxIndicator('#userName').fill(name);
        await textBoxIndicator('#userEmail').fill(email);
        await textBoxIndicator('#currentAddress').fill(address1);
        await textBoxIndicator('#permanentAddress').fill(address2);

    }

    async pressSubmit() {
        await this.page.click('#submit');
    }

}

export { mainPage }