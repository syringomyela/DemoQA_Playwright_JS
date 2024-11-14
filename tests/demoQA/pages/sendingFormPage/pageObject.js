import { Page } from 'playwright';
import { BasePage } from '../../../common/basePage';
import { interaction } from './inputs';


class mainPage extends BasePage {
    constructor(page) {
        super(page)
        this.method = new interaction;
    }
    
    elementOnPage() {
        return {
            firstNameBox: this.getElementBySelector('#firstName'),
            lastNameBox: this.getElementBySelector('#lastName'),
            emailBox: this.getElementBySelector('#userEmail'),
            phoneBox: this.getElementBySelector('#userNumber'),
            dateBox: this.getElementBySelector('#dateOfBirthInput'),
            pictureLoad: this.getElementBySelector('#uploadPicture'),
            addressBox: this.getElementBySelector('#currentAddress'),
            stateMenu: this.getElementBySelector('#state svg'),
            cityMenu: this.getElementBySelector('#city svg'),
        }
    }
    
    async fillForm(name1, name2, email, gender, phone, hobby, picture, address, state, city) {
        //names
        await this.elementOnPage().firstNameBox.fill(name1);
        await this.elementOnPage().lastNameBox.fill(name2);
        //email
        await this.elementOnPage().emailBox.fill(email);
        //gen
        if (gender) {
        await this.getElementByText(gender).click();
        }
        //number
        await this.elementOnPage().phoneBox.fill(phone);
        //date
        await this.enterDate(this.method.date().year, this.method.date().month, this.method.date().day);
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
            await this.elementOnPage().pictureLoad.setInputFiles(picture);
        }
        //fill address
        await this.elementOnPage().addressBox.fill(address);
        
        if (state) {
            await this.elementOnPage().stateMenu.scrollIntoViewIfNeeded();
            await this.elementOnPage().stateMenu.click();
            await this.getElementByText(state).click();
            await this.elementOnPage().cityMenu.scrollIntoViewIfNeeded();
            await this.elementOnPage().cityMenu.click();
            await this.getElementByText(city).click();
        }
    }

    async extractTableResult () {
        const rows = await this.page.$$('.modal-body table tbody tr');
        const extractedData = {};

        for (const row of rows) {
            const label = await row.$eval('td:nth-child(1)', element => element.textContent.trim());
            const value = await row.$eval('td:nth-child(2)', element => element.textContent.trim());
            extractedData[label] = value;
          }

        return extractedData;
        
    }

    async expectedResult(name1, name2, email, phone, gender, hobby, picture, address, state, city) {
        return {
                'Student Name' : name1 + ' ' + name2,
                'Student Email': email ,
                'Mobile': phone ,
                'Gender': gender ,
                'Date of Birth' : this.getDate() ,
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

    async enterDate(year, month, day) {
        await this.elementOnPage().dateBox.click();
        await this.page.selectOption('select.react-datepicker__month-select', `${month}`);
        await this.page.selectOption('select.react-datepicker__year-select', `${year}`);
        const days = await this.page.$$("div.react-datepicker__day");

        for (const calendarDay of days) {
            if (await calendarDay.textContent() == day) {
                await calendarDay.click();
                break;
            }
        }

    }

}

export { mainPage }
