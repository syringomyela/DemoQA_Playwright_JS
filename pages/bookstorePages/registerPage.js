import { Utilities } from "../../common/utils";
import { BasePage } from "../../common/basePage";

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.methods = new Utilities;
    }

    // generateUserCreds(length = 10) {
    //     //const password = `! + ${this.methods.getRandomInputData(length)}`
    //     return {
    //         userName : this.methods.getRandomInputData(length),
    //         password : `!A${this.methods.getRandomInputData(length)}`,
    //     }
    // }

}

export {RegisterPage}