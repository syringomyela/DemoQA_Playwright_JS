import { BasePage } from "../../common/basePage";
import { bookstoreEndpoints } from "./endpoints";

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }
        
    async loginElements(){
        return{
            nameField:  this.getElementBySelector("#userName"),
            passwordField:   this.getElementBySelector("#password"),
            loginButton:   this.getElementBySelector("#login"),
        }
    }

    async gotoLoginPage(){
        const loginEndpoint = bookstoreEndpoints.account.loginUI;
        await this.goto(loginEndpoint);
    }

    async loginProccess( username, password){
        const loginElements = await this.loginElements();
        await loginElements.nameField.fill(username);
        await loginElements.passwordField.fill(password);
        await loginElements.loginButton.click();
    }    
}

export {LoginPage}