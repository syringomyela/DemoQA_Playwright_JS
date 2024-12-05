import { BasePage } from "../../common/basePage";

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }
        
    async loginElements(){
        return{
            nameField:  this.getElementBySelector("#userName"),
            passwordField:  this.getElementBySelector("#password"),
            loginButton:  this.getElementBySelector("#login"),
        }
    }
    async loginProccess(loginURL, username, password){
        await this.goto(loginURL);
        await (await this.loginElements()).nameField.fill(username);
        await (await this.loginElements()).passwordField.fill(password);
        await (await this.loginElements()).loginButton.click();
    }    
}

export {LoginPage}