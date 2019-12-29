import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = '790892ed1c07443b8710d5c4d9f168b3';
        const url = 'https://api.spoonacular.com/recipes/search?';
        try {
            const res = await axios(`${url}apiKey=${key}&query=${this.query}`);
            this.result = res.data.results;
            //console.log(this.result);
        }
        catch (error) {
            alert(error);
        }
    
    }
}
