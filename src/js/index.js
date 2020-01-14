// Global app controller 

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderSpinner, removeSpinner } from './views/base';

/* Gloabal state of the applicationCache 
 * - Search Object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
 */
const state = {};

/**
 *  SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get query from view
   const query = searchView.getInput();

    if (query) {
        // 2. New serch object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        //searchView.clearResults();
        renderSpinner(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            // console.log(state.search.result);
            removeSpinner();
            searchView.renderResults(state.search.result);
        }
        catch (err) {
            alert('Search failure! Something went wrong!')
            removeSpinner();
        }
    }
}

//Add our Event Handlers

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    //const btn = e.target.closest(elements.searchBtnInline);
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

/**
 *  RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get the Hash ID from URL
    const hashID = window.location.hash.replace('#', '');
    console.log(hashID);

    if (hashID) {
        // 1. Prepare UI for changes
        recipeView.clearRecipe();
        renderSpinner(elements.recipe);

        // Hightlight selected search item
        if (state.search)searchView.highlightSelected(hashID);

        // 2. Create new recipe object
        state.recipe = new Recipe(hashID);

        // TESTING
        window.r = state.recipe;

        try {

            // 3. Get recipe data
            await state.recipe.getRecipe();


            // 4. Render recipe on page
            //console.log(state.recipe);
            removeSpinner();
            recipeView.renderRecipe(state.recipe);
        }


        catch (err) {
            alert('Error getting recipe!');
        }
    }
};

 // Event which fires when url hash changes
//window.addEventListener('hashchange', controlRecipe);

// Event which fires when url initially loads
//window.addEventListener('load', controlRecipe); 

// Event which fires when url initially loads or hash changes
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// 150