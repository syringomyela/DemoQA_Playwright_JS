import { test, expect } from '../common/fixtures';
import { ProfilePage } from '../pages/bookstorePages/profilePage';
import { LoginPage } from '../pages/bookstorePages/loginPage';

test('Registration, login and bookstore interaction through API, UI verification of its results:  ', async ({ registerAPI, page }) => {
  const { data, APImethods } = registerAPI;
  const profilePage = new ProfilePage(page);
  const loginPage = new LoginPage(page);

  const loginResp = await APImethods.loginUserRequest();
  expect(loginResp.loginResponse.status()).toBe(200);
  expect(loginResp.authToken).toBeDefined();

  const expectedBooksData = (await APImethods.retrieveExpectedBooksTitlesNIsbns()).bookTitles;
  const addingBooksResponse = await APImethods.addBooksToProfile();

  expect(addingBooksResponse.status()).toBe(201);

  await loginPage.gotoLoginPage();
  await loginPage.loginProccess(registerAPI.data.userName, registerAPI.data.password);
  const addedBooks = await profilePage.getBooksTitlesInProfile();
  expect(addedBooks).toEqual(expectedBooksData);
});
