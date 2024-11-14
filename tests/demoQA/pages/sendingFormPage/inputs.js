
import { Page } from 'playwright';
import { utilities } from '../../../common/utils.js';


class interaction extends utilities {
    constructor(page) {
        super(page)
    }
    
    state() {
        return {
            'Uttar Pradesh' : ['Agra', 'Luckhow', 'Merrut'], 
            Haryana : ['Karnal', 'Panipat'], 
            NCR : ['Delhi', 'Gurgaon', 'Noida'], 
            Rajasthan : ['Jaipur', 'Jaiselmer'],
        }
    }

    gender() {
        return ['Male', 'Female','Other']
    }

    date() {
        let random = (limit) => Math.floor(Math.random() * limit)
        let month = random(12);
        let year = random(125) +1900; //2024
            
        let day = () => {
            const days = {
                0: 31,
                1: 28, 
                2: 31, 
                3: 30, 
                4: 31, 
                5: 30, 
                6: 31, 
                7: 31, 
                8: 30, 
                9: 31, 
                10: 30, 
                11: 31,
            };
                
        if (month == 1) {
            if ((year % 4 == 0 || year !== 1900)) {
                return random(29) + 1;
            } return random(28) + 1;
        } return random(days[month]) + 1;
        };

        const dayString = day < 10 ? `0${day()}` : `${day()}`

        return {
                month: month,
                year: year,
                day: dayString
        }
    }

    getRandomHobby() {
    let hobbies = ['Sports','Reading','Music']
        return hobbies[Math.floor((Math.random()*hobbies.length))];   
    }

    getRandomGender() {
        return this.gender()[Math.floor(Math.random() * this.gender().length)]
    }

    chooseState() {
        const keys = Object.keys(this.state());
        return  keys[Math.floor(Math.random() * keys.length)];
    }

    chooseCity() {
        const randomState = this.chooseState();
        const cities = this.state()[randomState];
        const randomCity = cities[Math.floor(Math.random() * cities.length)]
        return [randomState, randomCity];
    }

    generateFormData(length = 10) {
        const [state, city] = this.chooseCity();
        return {
            name1 : this.getRandomInputData(length),
            name2 : this.getRandomInputData(length),
            gender : this.getRandomGender(),
            email : this.getRandomEmail(length),
            number : this.getRandomNumber(10),
            hobby : this.getRandomHobby(),
            address : this.getRandomInputData(length),
            picture : 'tests/demoQA/pages/sendingFormPage/superJumbo.jpg',
            state : state,
            city : city,
    }
}
}

export {interaction}