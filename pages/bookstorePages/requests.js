export function userCredsBody(){
    return {
        userName: "admin1",
        password: "Password123!",
    };
}

// export function  addBooksBody(authToken, userID, booksISBNArray) {
// return  {
//     headers: {
//         "Authorization": `Bearer ${authToken}`,
//     },
//     data: {
//         "userId": userID,
//         "collectionOfIsbns": booksISBNArray,
//     }
// }
// }