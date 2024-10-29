
export function randomizeInput() {
    const input = Math.random().toString(36).substring(2, 10)
    return input;
}

export function randomizeEmail() {
    const email = Math.random().toString(36).substring(2, 10) + '@mail.com'
    return email;
}