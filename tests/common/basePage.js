import { Page } from 'playwright';

class BasePage{
    constructor(page) {
        this.page = page; 
    }

    async goto() {
        await this.page.goto('/automation-practice-form');
    }

  getElementBySelector(selector) {
    return this.page.locator(selector);
}

  getElementByText (selector) {
    return this.page.getByText(selector, { exact : true })
}

  getElementByRole (selector) {
    return this.page.getByRole(selector);
}

  getElementByLabel (selector) {
    return this.page.getByLabel(selector);
} 

  getDate() {
    return this.page.inputValue('#dateOfBirthInput');
}

}

export { BasePage }