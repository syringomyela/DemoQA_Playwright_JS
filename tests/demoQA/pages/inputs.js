
function randomizeInput() {
    const input = Math.random().toString(36).substring(2, 10)
    return input;
}

function randomizeEmail() {
    const email = Math.random().toString(36).substring(2, 10) + '@mail.com'
    return email;
}

export const filler = {
    name : randomizeInput(),
    email : randomizeEmail(),
    fakeEmail : randomizeInput(),
    currentAddress : randomizeInput(),
    permanentAddress : randomizeInput(),
}