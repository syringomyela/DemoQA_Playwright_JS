import { Page } from 'playwright';

class Utilities {
    constructor(page) {
        this.page = page; 
    }

    getRandomInputData(length) {
        return  Math.random().toString(36).substring(2, length);
    }
    
    getRandomEmail(length) {
        return Math.random().toString(36).substring(2, length) + '@mail.com';
    }
    
    getRandomNumber(length) {
        return Math.floor(Math.random() * Math.pow(10, length)).toString()
    }
    
    getRandomDate() {
        const start = new Date(0); //01011970
        const end = Date.now();
    
        const date = new Date(start.getTime() + Math.random() * (end - start.getTime()));
    
        date.setHours(0, 0, 0, 0); //!!!
    
    return date.toISOString().split('T')[0];
    }

}

export {Utilities}

