import { Page } from 'playwright';

class mainPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {

        await this.page.goto('/automation-practice-form');
    }

    async getElementBySelector(selector) {
        console.log(this.page.locator(selector));
        return this.page.locator(selector);
    }
    
    async getElementByText (selector) {
        return this.page.getByText(selector, { exact : true })
    }

    async getDate() {
        return  this.page.inputValue('#dateOfBirthInput');
    }
    
    async fillForm(name1, name2, email, phone, date, hobby, picture, address) {
        //names
        await this.getElementBySelector('#firstName').fill(name1);
        await this.getElementBySelector('#lastName').fill(name2);
        //email
        await this.getElementBySelector('#userEmail').fill(email);
        //gen
        await this.getElementByText('Male').click();
        //number
        await this.getElementBySelector('#userNumber').fill(phone);
        //date
        await this.getElementBySelector('#dateOfBirthInput').fill(date);
        //choose subjects
        await this.getElementBySelector('.subjects-auto-complete__value-container').click();
        await this.getElementBySelector('subjectsInput').fill('d');
        await this.getElementByText('Social Studies').click();
        //hobbies
        await this.getElementByText(hobby).click();
        //upload picture
        await this.getElementBySelector('uploadPicture').setInputFiles(picture);
        //fill address
        await this.getElementBySelector('#currentAddress').fill(address);
    }

    async outputResult(name1, name2, email, phone, date, hobby, picture, address) {
        return [
                { label: 'Student Name', value: name1 + ' ' + name2},
                { label: 'Student Email', value: email },
                { label: 'Mobile', value: phone },
                { label: 'Gender', value: 'Male' },
                { label: 'Date of Birth', value: date },
                { label: 'Subjects', value: 'Social Studies' },
                { label: 'Hobbies', value: hobby },
                { label: 'Address', value: address },
                { label: 'State and City', value: 'Uttar Pradesh Lucknow' }
        ]
    }



    async pressSubmitButton() {
        await this.getElementBySelector('#submit').click();
    }

}

export { mainPage }
