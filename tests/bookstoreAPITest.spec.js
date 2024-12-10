import { test, expect } from "../common/fixtures";
import { makeISBNArrayForRequest, formExpectedBooksTitles} from "../pages/bookstorePages/booksJSON.js";
import { ProfilePage } from "../pages/bookstorePages/profilePage";
import { LoginPage } from "../pages/bookstorePages/loginPage";


test('Registration, login and bookstore interaction through API, UI verification of its results:  ', async ({registerAPI, request, page}) => {
    
    const {actualPage, data, endpoints, } = registerAPI;
    const profilePage = new ProfilePage(page);
    const loginPage = new LoginPage(page);


    await request.post(endpoints.account.generateToken, {data});
    const logResponse = await request.post(endpoints.account.login, {data});
    const loginResponseBody = await logResponse.json();
    const userID = loginResponseBody.userId;
    const authToken = loginResponseBody.token;
    expect(logResponse.status()).toBe(200);
    expect(loginResponseBody.token).toBeDefined();

    const expectedBooksTitles = formExpectedBooksTitles();
    const booksISBN = makeISBNArrayForRequest();
    const addBooksResponse  = await request.post(endpoints.bookstore.books, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
        data: {
            "userId": userID,
            "collectionOfIsbns": booksISBN,
        }
    });

    expect(addBooksResponse.status()).toBe(201);

    await loginPage.gotoLoginPage();
    await loginPage.loginProccess(registerAPI.data.userName, registerAPI.data.password);
        const addedBooks =  await profilePage.getBooksTitlesInProfile();
        console.log(addedBooks);
        console.log(expectedBooksTitles);
        expect(addedBooks).toEqual(expectedBooksTitles);
})
    