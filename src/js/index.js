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

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/* Gloabal state of the applicationCache 
 * - Search Object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. Get query from view
   const query = searchView.getInput();

    if (query) {
        // 2. New serch object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        //searchView.clearResults();

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
       // console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//const search = new Search('pasta');
//console.log(search);
//search.getResults();
// 143 06:40