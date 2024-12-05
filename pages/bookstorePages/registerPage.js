import { utilities } from "../../common/utils";
import { BasePage } from "../../common/basePage";

class registerPage extends BasePage {
    constructor(page) {
        super(page);
        this.methods = new utilities;
    }

    generateInput(length = 10) {
        //const password = `! + ${this.methods.getRandomInputData(length)}`
        return {
            userName : this.methods.getRandomInputData(length),
            password : `!A${this.methods.getRandomInputData(length)}`,
        }
    }

}

export {registerPage}