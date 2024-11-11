
function getRandomInputData(length) {
    return Math.random().toString(36).substring(2, length);
}

function getRandomEmail(length) {
    return Math.random().toString(36).substring(2, length) + '@mail.com';
}

function getRandomNumber(length) {
    return Math.floor(Math.random() * Math.pow(10, length)).toString()
}

function getRandomDate() {
    const start = new Date(0); //01011970
    const end = Date.now();

    const date = new Date(start.getTime() + Math.random() * (end - start.getTime()));

    date.setHours(0, 0, 0, 0); //!!!

return date.toISOString().split('T')[0];
}

function getRandomHobby() {
    let hobbies = ['Sports','Reading','Music']
    return hobbies[Math.floor((Math.random()*hobbies.length))];   
}

export function  generateFormData(length = 10) {
    return {
        name1 : getRandomInputData(length),
        name2 : getRandomInputData(length),
        email : getRandomEmail(length),
        number : getRandomNumber(10),
        date : getRandomDate(),
        hobby : getRandomHobby(),
        address : getRandomInputData(length),
        picture : 'tests/demoQA/pages/sendingFormPage/superJumbo.jpg',
    }
}