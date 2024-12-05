import { BasePage } from "../../common/basePage";

class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
    }

    profilePageElements() {
        return {
            tableTitleRow : "span.mr-2 a",
            dropdownMenu: '[aria-label="rows per page"]',
        }
    }
    async booksTitlesInProfile(){
        await this.page.waitForSelector(this.profilePageElements().tableTitleRow);
        await this.getElementBySelector(this.profilePageElements().dropdownMenu).selectOption("10 rows");
        const addedBooksTitles = await this.page.$$eval('span.mr-2 a', rows =>
            rows.map(row => row.textContent)
          );
        console.log(addedBooksTitles);
          return addedBooksTitles;
    }
}

export {ProfilePage}