import { Page } from 'playwright';
import { FullNameBox, EmailBox, CurrentAddressBox, PermanentAddressBox, SubmitButton } from '../prereqObjects/pageElements'

const fullName = 'Wiggelton';
const emailAddress = 'samplemail@mail.com';
const currentAddress = '6969 Cool Str';
const permanentAddress = 'Kuznetcova 3a';

class mainPage {
    constructor(page) {
        this.page = page;
        this.nameBox = new FullNameBox;
        this.emailBox = new EmailBox;
        this.currentAddressBox = new CurrentAddressBox;
        this.permanentAddressBox = new PermanentAddressBox;
        this.submitButton = new SubmitButton;
    }
    
    async goto() {
        await this.page.goto('https://demoqa.com/text-box');
    }

    async fillTextBoxes(name, email, current, permanent) {
        await this.page.nameBox.fillNameBox(name);
        await this.page.emailBox.fillEmail(email);
        await this.page.currentAddressBox.fillCurrentAddress(current);
        await this.page.permanentAddressBox.fillPermanentAddress(permanent);
    }

    async pressSubmit() {
        await this.page.submitButton;
    }

    async getText() {
        await {}
    }
}

export { mainPage }
export { fullName, emailAddress, currentAddress, permanentAddress }