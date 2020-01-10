import axios from 'axios';
import { key, url } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const maxResults = 50;
        try {
            const res = await axios(`${url}search?apiKey=${key}&query=${this.query}&number=${maxResults}`);
            this.result = res.data.results;
            //console.log(this.result);
        }
        catch (error) {
            alert(error);
        }
    
    }
}
