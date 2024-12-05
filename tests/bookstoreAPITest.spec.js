import { test, expect } from "../common/fixtures";
import { books } from "../pages/bookstorePages/booksJSON";
import { ProfilePage } from "../pages/bookstorePages/profilePage";
import { LoginPage } from "../pages/bookstorePages/loginPage";


test('Registration, login and bookstore interaction through API, UI verification of its results:  ', async ({registerAPI, request, page}) => {
    
    const {actualPage, data, endpoints, } = registerAPI;
    const profilePage = new ProfilePage(page);
    const loginPage = new LoginPage(page);

    let booksISBN = [];
    const addedBooksTitles = [];

    await request.post(endpoints.account.generateToken, {data});
    const logResponse = await request.post(endpoints.account.login, {data});
    const loginResponseBody = await logResponse.json();
    const userID = loginResponseBody.userId;
    const authToken = loginResponseBody.token;
    expect(logResponse.status()).toBe(200);
    expect(loginResponseBody.token).toBeDefined();

    for (let book of books) {
        let bookISBN = book.isbn;
        let bookTitle = book.title;
        booksISBN.push({ "isbn": bookISBN });
        addedBooksTitles.push(bookTitle);
    }

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

    const respBody = await addBooksResponse.json();

    console.log(respBody);


    await loginPage.loginProccess(endpoints.account.loginUI, registerAPI.data.userName, registerAPI.data.password);
        const addedBooks =  await profilePage.booksTitlesInProfile();
        console.log(addedBooks);

        expect(addedBooks).toEqual(addedBooksTitles);
})
    