import { Page } from 'playwright';
import { BasePage } from '../../../common/basePage';

class mainPage extends BasePage {
    constructor(page) {
        super(page)
    }
    
    async fillForm(name1, name2, email, gender, phone, date, hobby, picture, address, state, city) {
        //names
        await this.getElementBySelector('#firstName').fill(name1);
        await this.getElementBySelector('#lastName').fill(name2);
        //email
        await this.getElementBySelector('#userEmail').fill(email);
        //gen
        if (gender) {
        await this.getElementByText(gender).click();
        }
        //number
        await this.getElementBySelector('#userNumber').fill(phone);
        //date
        if (date) {
            await this.getElementBySelector('#dateOfBirthInput').fill(date);
            await this.page.keyboard.press('Enter');
        }
        //choose subjects
        await this.getElementBySelector('.subjects-auto-complete__value-container').click();
        await this.getElementBySelector('#subjectsInput').fill('d');
        await this.getElementByText('Social Studies').click();
        //hobbies
        if (hobby) {
            await this.getElementByText(hobby).click();
        }
        //upload picture
        if (picture) {
            await this.getElementBySelector('#uploadPicture').setInputFiles(picture);
        }
        //fill address
        await this.getElementBySelector('#currentAddress').fill(address);
        
        if (state) {
            await this.getElementBySelector('#state svg').click()
            await this.page.waitForSelector(`text=${state}`, { timeout: 5000 });
            await this.getElementByText(state).click();
            await this.getElementBySelector('#city svg').click();
            await this.page.waitForSelector(`text=${city}`, { timeout: 5000 });
            await this.getElementByText(city).click();
        }
    }

    async extractTableResult (selector) {
        const rows = await this.page.$$(selector);
        const extractedData = {};

        for (const row of rows) {
            const label = await row.$eval('td:nth-child(1)', element => element.textContent.trim());
            const value = await row.$eval('td:nth-child(2)', element => element.textContent.trim());
            extractedData[label] = value;
          }

        return extractedData;
        
    }
    async expectedResult(name1, name2, email, phone, date, hobby, picture, address, state, city) {
        return {
                'Student Name' : name1 + ' ' + name2,
                'Student Email': email ,
                'Mobile': phone ,
                'Gender': 'Male' ,
                'Date of Birth' : date ,
                'Subjects' : 'Social Studies',
                'Hobbies' : hobby,
                'Picture' : picture.split('/').pop(),
                'Address' : address,
                'State and City' : state + ' ' + city,
        }
    }

    async pressSubmitButton() {
        await this.getElementBySelector('#submit').click();
    }

}

export { mainPage }
