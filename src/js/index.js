// Global app controller
//import str from './models/Search';

// Importing multiple items
// import {add, multiply, ID} from './views/searchView';
// console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(ID,2)} and str = ${str}`);

// Importing multiple items
 // import {add as a, multiply as m, ID as i} from './views/searchView';
 // console.log(`Using imported functions! ${a(i, 3)} and ${m(i,4)} and str = ${str}`);

//  import * as searchView from './views/searchView'; 
//  console.log(`Using imported functions! ${searchView.add(searchView.ID, 3)} and ${searchView.multiply(searchView.ID,4)} and searchView.str = ${str}`);


//API Key 781b4a0a52msh7d3cf852c91f399p10ba7ajsn538745683980
// Host webknox-recipes.p.rapidapi.com
// 139 09:00

import axios from 'axios';

//let q = `${url}apiKey=${key}`;

async function getResults(query) {
    const key = '790892ed1c07443b8710d5c4d9f168b3';
    const url = 'https://api.spoonacular.com/recipes/search?';
    try {
        const res = await axios(`${url}apiKey=${key}&query=${query}`);
        const recipes = res.data.results;
        console.log(recipes);
    }
    catch (error) {
        alert(error);
    }

}

getResults('pizza');

// 140