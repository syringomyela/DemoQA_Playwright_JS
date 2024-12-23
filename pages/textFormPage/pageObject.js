import { Page } from 'playwright';

class mainPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/text-box');
  }

  getElementBySelector(selector) {
    return this.page.locator(selector);
  }

  outputResult() {
    return {
      name: this.getElementBySelector('#output #name'),
      email: this.getElementBySelector('#output #email'),
      currentAddress: this.getElementBySelector('#output #currentAddress'),
      permanentAddress: this.getElementBySelector('#output #permanentAddress'),
    };
  }

  async fillTextBoxes(name, email, address1, address2) {
    await this.getElementBySelector('#userName').fill(name);
    await this.getElementBySelector('#userEmail').fill(email);
    await this.getElementBySelector('#currentAddress').fill(address1);
    await this.getElementBySelector('#permanentAddress').fill(address2);
  }

  async pressSubmitButton() {
    await this.getElementBySelector('#submit').click();
  }
}

export { mainPage };
