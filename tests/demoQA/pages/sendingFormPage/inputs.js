
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

const state = {
    'Uttar Pradesh' : ['Agra', 'Luckhow', 'Merrut'], 
    Haryana : ['Karnal', 'Panipat'], 
    NCR : ['Delhi', 'Gurgaon', 'Noida'], 
    Rajasthan : ['Jaipur', 'Jaiselmer'],
}

export const gender = ['Male', 'Female','Other']

function getRandomGender() {
return gender[Math.floor(Math.random() * gender.length)]
}

function chooseState() {
    const keys = Object.keys(state);
    return  keys[Math.floor(Math.random() * keys.length)];
}

function chooseCity() {
    const randomState = chooseState();
    const cities = state[randomState];
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    return [randomState, randomCity];
}

export function  generateFormData(length = 10) {
    const [state, city] = chooseCity();
    return {
        name1 : getRandomInputData(length),
        name2 : getRandomInputData(length),
        gender : getRandomGender(),
        email : getRandomEmail(length),
        number : getRandomNumber(10),
        date : getRandomDate(),
        hobby : getRandomHobby(),
        address : getRandomInputData(length),
        picture : 'tests/demoQA/pages/sendingFormPage/superJumbo.jpg',
        state : state,
        city : city,
    }
}