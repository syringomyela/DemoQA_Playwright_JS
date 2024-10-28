import { Page } from 'playwright';

class FullNameBox{
    constructor(page) {
        this.page = page;
    }

    async fillNameBox(name) {
        await this.page.getByPlaceholder('Full Name').fill(name);
    }
}

class EmailBox{
    constructor(page) {
        this.page = page;
    }

    async fillEmail(email) {
        await this.page.getByPlaceholder('name@example.com').fill(email);
    }
}

class CurrentAddressBox {
    constructor(page) {
        this.page = page;
    }

    async fillCurrentAddress(address) {
        await this.page.getByPlaceholder('Current Address').fill(address);
    }
}       

class PermanentAddressBox {
    constructor(page) {
        this.page = page;
    }

    async fillPermanentAddress(address) {
        await this.page.locator('#permanentAddress').fill(address);
    }
}

class SubmitButton {
    constructor(page) {
        this.page = page;
    }

    async pressButton() {
        await this.page.click('button', { name: 'Submit' });
    }
}
export { FullNameBox, EmailBox, CurrentAddressBox, PermanentAddressBox, SubmitButton };