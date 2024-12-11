import { makeISBNArrayForRequest } from "./booksJSON";

export function userAuthentCredsBody(){
    return {
        userName: "admin1",
        password: "Password123!"
    };
}

export async function addBooksBody(authToken, userID) {
    const booksISBNArray = await makeISBNArrayForRequest();
return  {
    headers: {
        "Authorization": `Bearer ${authToken}`,
    },
    data: {
        "userId": userID,
        "collectionOfIsbns": booksISBNArray,
    }
}
}