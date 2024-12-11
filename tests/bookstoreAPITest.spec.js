import { test, expect } from "../common/fixtures";
import { formExpectedBooksTitles} from "../pages/bookstorePages/booksJSON.js";
import { ProfilePage } from "../pages/bookstorePages/profilePage";
import { LoginPage } from "../pages/bookstorePages/loginPage";


test('Registration, login and bookstore interaction through API, UI verification of its results:  ', async ({registerAPI, page}) => {
    
    const {registerPage, data, request} = registerAPI;
    const profilePage = new ProfilePage(page);
    const loginPage = new LoginPage(page);


    const loginResponse = await request.loginUserRequest();
    const loginResponseJSON = await request.parseToJSON(loginResponse);
    expect(loginResponse.status()).toBe(200);
    expect(loginResponseJSON.token).toBeDefined();

    const expectedBooksTitles = formExpectedBooksTitles();
    const addBooksResponse = await request.addBooksToProfile();

    expect(addBooksResponse.status()).toBe(201);

    await loginPage.gotoLoginPage();
    await loginPage.loginProccess(registerAPI.data.userName, registerAPI.data.password);
        const addedBooks =  await profilePage.getBooksTitlesInProfile();
        expect(addedBooks).toEqual(expectedBooksTitles);
})
    