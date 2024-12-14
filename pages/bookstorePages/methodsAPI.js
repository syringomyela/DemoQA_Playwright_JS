import { Page } from 'playwright';
import { APIRequestContext } from 'playwright';
import { bookstoreEndpoints } from './endpoints.js';
import { userAuthentCredsBody } from './requests.js';

class baseAPIInteraction {
    constructor(page, request){
        this.page = page;
        this.request = request;
        this.endpoint = bookstoreEndpoints;
        this.userCredentials = userAuthentCredsBody();

    }

    async registerUserRequest(){
        const data = this.userCredentials;
        const registerResponse = await this.request.post(this.endpoint.account.user, data); 
        return registerResponse;
    }

    async loginUserRequest(){
        const data = this.userCredentials;
        await this.request.post(this.endpoint.account.generateToken, data);
        const loginResponse = await this.request.post(this.endpoint.account.login, {data});
        const loginResponseJSON = await this.parseToJSON(loginResponse);
        const authToken = loginResponseJSON.token;
        const userId = loginResponseJSON.userId;
        return {loginResponse, authToken, userId};
    }

    async createRequestForAddingBooks() {
        const loginResponse = await this.loginUserRequest();
        const booksData = await this.retrieveExpectedBooksTitlesNIsbns();
        const formedRequest = {    
            headers: {
                "Authorization": "Bearer " + loginResponse.authToken,
            },
            data: {
                userId : loginResponse.userId,
                collectionOfIsbns : booksData.booksIsbns
            }
        }
        return formedRequest;
    } 

    async retrieveExpectedBooksTitlesNIsbns(){
        const bookTitles = [];
        const booksIsbns = [];
        const booksDataRespond = await this.request.get(this.endpoint.bookstore.books, '');
        const JSONRespond = await this.parseToJSON(booksDataRespond);
        const booksArray = JSONRespond.books;
        booksArray.forEach(book => {
            bookTitles.push(book.title);
            booksIsbns.push({ isbn : book.isbn})
        })
        return {bookTitles, booksIsbns};
    }

    async addBooksToProfile(){
        const formedRequest = await this.createRequestForAddingBooks();
        const addBooksResponse  = await this.request.post(this.endpoint.bookstore.books, formedRequest);
        return addBooksResponse;
    }

    async parseToJSON(response){
        const valueInJSON = await response.json();
        return valueInJSON;
    }
}

export {baseAPIInteraction}