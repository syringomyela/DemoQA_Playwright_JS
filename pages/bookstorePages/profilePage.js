import { BasePage } from "../../common/basePage";

class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
    }

    profilePageElements() {
        return {
            tableTitleRow : this.getElementBySelector("span.mr-2 a").all(),
            dropdownMenu: this.getElementBySelector('[aria-label="rows per page"]'),
        }
    }
    async getBooksTitlesInProfile(){
        await this.profilePageElements().dropdownMenu.selectOption("10 rows");
        const titlesRows = await this.profilePageElements().tableTitleRow;
        const addedBooksTitles = [];
        for (const link of titlesRows) {
            const title = await link.textContent();
            addedBooksTitles.push(title);
        }
          return addedBooksTitles;
    }
}

export {ProfilePage}