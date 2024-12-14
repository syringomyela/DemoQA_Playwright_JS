import { test, expect } from '../common/fixtures.js';

test('Positive scenario, all fields are filled correctly and sent:', async ({ fillFormPage, generateFormData }) => {
  await fillFormPage.fillForm(
    generateFormData.name1,
    generateFormData.name2,
    generateFormData.email,
    generateFormData.gender,
    generateFormData.number,
    generateFormData.hobby,
    generateFormData.picture,
    generateFormData.address,
    generateFormData.state,
    generateFormData.city,
  );

  const expectedResults = fillFormPage.expectedResult(
    generateFormData.name1,
    generateFormData.name2,
    generateFormData.email,
    generateFormData.gender,
    generateFormData.number,
    generateFormData.hobby,
    generateFormData.picture,
    generateFormData.address,
    generateFormData.state,
    generateFormData.city,
  );

  await fillFormPage.pressSubmitButton();
  const actualData = await fillFormPage.extractTableResult();

  for (const [key, value] of Object.entries(expectedResults)) {
    expect(actualData[key]).toBe(value);
  }
});

test('Negative scenario, incorrect value for Email field:', async ({ fillFormPage, generateFormData }) => {
  const errorIndics = await fillFormPage.errorIndicators();
  await fillFormPage.fillForm(
    generateFormData.name1,
    generateFormData.name2,
    generateFormData.name1,
    generateFormData.gender,
    generateFormData.number,
    generateFormData.hobby,
    generateFormData.picture,
    generateFormData.address,
    generateFormData.state,
    generateFormData.city,
  );

  const emailBoxElement = fillFormPage.elementOnPage().emailBox;
  await fillFormPage.pressSubmitButton();
  await expect(emailBoxElement).toHaveCSS(errorIndics.element, errorIndics.color); //error marker
});

test('Negative scenario, incorrect value for Mobile(phone number) field:', async ({ fillFormPage, generateFormData }) => {
  const errorIndics = await fillFormPage.errorIndicators();
  await fillFormPage.fillForm(
    generateFormData.name1,
    generateFormData.name2,
    generateFormData.email,
    generateFormData.gender,
    '',
    generateFormData.hobby,
    generateFormData.picture,
    generateFormData.address,
    generateFormData.state,
    generateFormData.city,
  );

  const mobileBoxElement = fillFormPage.elementOnPage().phoneBox;
  await fillFormPage.pressSubmitButton();

  await expect(mobileBoxElement).toHaveCSS(errorIndics.element, errorIndics.color); //error marker
});

test('Negative scenario, empty fields for name:', async ({ fillFormPage, generateFormData }, testInfo) => {
  const errorIndics = await fillFormPage.errorIndicators();
  await fillFormPage.fillForm(
    '',
    '',
    generateFormData.email,
    generateFormData.gender,
    generateFormData.number,
    generateFormData.hobby,
    generateFormData.picture,
    generateFormData.address,
    generateFormData.state,
    generateFormData.city,
  );
  const firstName = fillFormPage.elementOnPage().firstNameBox;
  const lastName = fillFormPage.elementOnPage().lastNameBox;
  await fillFormPage.pressSubmitButton();

  await expect(firstName).toHaveCSS(errorIndics.element, errorIndics.color);
  await expect(lastName).toHaveCSS(errorIndics.element, errorIndics.color);
});

test.only('Negative scenario, sending empty form:', async ({ fillFormPage, interaction }) => {
  const errorIndics = await fillFormPage.errorIndicators();
  await fillFormPage.fillForm('', '', '', '', '', '', '', '', '', '');
  const firstName = fillFormPage.elementOnPage().firstNameBox;
  const lastName = fillFormPage.elementOnPage().lastNameBox;
  const mobileBox = fillFormPage.elementOnPage().phoneBox;
  const genders = interaction.gender(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  await fillFormPage.pressSubmitButton();
  await expect(firstName).toHaveCSS(errorIndics.element, errorIndics.color);
  await expect(lastName).toHaveCSS(errorIndics.element, errorIndics.color);
  await expect(mobileBox).toHaveCSS(errorIndics.element, errorIndics.color);
  for (const gen of genders) {
    await expect(fillFormPage.getElementByText(gen)).toHaveCSS(errorIndics.element, errorIndics.color);
  }
});
