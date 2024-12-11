import { Page } from 'playwright';
import { APIRequestContext } from 'playwright';
import { bookstoreEndpoints } from './endpoints.js';
import { userAuthentCredsBody, addBooksBody } from './requests.js';
import { makeISBNArrayForRequest } from './booksJSON.js';

class baseAPIInteraction {
    constructor(page, request){
        this.page = page;
        this.request = request;
        this.endpoint = bookstoreEndpoints;
        this.userCredentials = userAuthentCredsBody();
        this.generateAddingBooksBody = addBooksBody(this.authToken, this.userID);
        this.booksISBNArray = makeISBNArrayForRequest();

    }

    async postMethod(endpoint, requestData){
        const respond = await this.request.post(endpoint, requestData);
        return respond;
    }

    async registerUserRequest(){
        const data = this.userCredentials;
        const registerResponse = await this.postMethod(this.endpoint.account.user, data); 
        return registerResponse;
    }

    async loginUserRequest(){
        const data = this.userCredentials;
        await this.postMethod(this.endpoint.account.generateToken, data);
        const loginResponse = await this.postMethod(this.endpoint.account.login, {data});
        return loginResponse;
    }

    async addBooksToProfile(){
        const booksISBNs = await this.booksISBNArray;
        const loginResponse = await this.loginUserRequest();
        const loginResponseJSON = await this.parseToJSON(loginResponse);
        const authToken = loginResponseJSON.token;
        const userId = loginResponseJSON.userId;
        const requestBody = {    
            headers: {
            "Authorization": "Bearer " + authToken,
            },
            data: {
            "userId": userId,
            "collectionOfIsbns": booksISBNs,
        }
    }

        const addBooksResponse  = await this.postMethod(this.endpoint.bookstore.books, requestBody);
        return addBooksResponse;
    }

    async parseToJSON(response){
        const valueInJSON = await response.json();
        return valueInJSON;
    }
}

export {baseAPIInteraction}