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
    async getBooksTitlesInProfile(){
        await this.page.waitForSelector(this.profilePageElements().tableTitleRow);
        await this.getElementBySelector(this.profilePageElements().dropdownMenu).selectOption("10 rows");
        const titlesRows = this.profilePageElements().tableTitleRow;
        const addedBooksTitles = await this.page.$$eval(titlesRows, rows =>
            rows.map(row => row.textContent)
          );
          return addedBooksTitles;
    }
}

export {ProfilePage}