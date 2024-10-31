import { Page } from 'playwright';

class mainPage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('/text-box');
    }

    async getTextBox() {
        let textBoxIndicator = (id) =>  this.page.locator(id);
        await textBoxIndicator('#userName');
        
    }
    async fillTextBoxes(name, email, address1, address2) {
        
        let textBoxIndicator = (id) =>  this.page.locator(id);

        await textBoxIndicator('#userName').fill(name);
        await textBoxIndicator('#userEmail').fill(email);
        await textBoxIndicator('#currentAddress').fill(address1);
        await textBoxIndicator('#permanentAddress').fill(address2);

    }
    // async output() {
    //     const result = {
    //         name : await this.page.locator('#output #name').innerText(),
    //         email : this.page.locator('#output #email'),
    //         currentAddress : this.page.locator('#output #currentAddress'),
    //         permanentAddress : this.page.locator('#output #permanentAddress'),
    //     }
    //     return result;
    // }

    async pressSubmit() {
        await this.page.click('#submit');
    }


    // async getText(name, email, current, permanent) {
    //     await this.page.locator('#output')
    // }
}

export { mainPage }