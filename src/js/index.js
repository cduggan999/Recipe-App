// Global app controller 

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderSpinner, removeSpinner } from './views/base';

/* Gloabal state of the applicationCache 
 * - Search Object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
 */
const state = {};
window.state = state; //TESTING
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


// Event which fires when url initially loads or hash changes
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 *  LIST CONTROLLER
 */
const controlList = () => {
    // 1. Create a new list if there is none
    if(!state.list) state.list = new List();

    // 2. Add each ingredient to shopping list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name);
        listView.renderItem(item);
    });
};

// Shopping List delete and update events
elements.shoppingList.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    // Delete button pressed
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id)

        // Delete from list
        listView.deleteItem(id);
    }
    // Amount Updates
    else if (event.target.matches('.shopping__count-value')) {
        const updatedAmount = parseFloat(event.target.value);
        state.list.updateAmount(id, updatedAmount);
    }
});

/**
 *  LIKES CONTROLLER
 */
const controlLikes = () => {
    // 1. Create a new likes list if there is none
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User Not yet liked (more common scenario)
    if(!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.image
        );
            
        // Toggle Like button

        // Add like to UI List
        console.log(state.likes);
    } 
    // Liked
    else {
        // Remove like to the state
        state.likes.deleteLike(currentID);

        // Toggle Like button

        // Remove like to UI List
        console.log(state.likes);
    }
};

// Recipe Button Event Listner (use event delegation as button not visible at load time)
elements.recipe.addEventListener('click', event => {
    // If target = decrease or any child of decrease
    if (event.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings > 1){
        state.recipe.updateServings('dec');
        recipeView.updateServings(state.recipe);
    }
    else if (event.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }
    else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add to Shopping list
        controlList();
    }
    // Likes button pressed
    else if (event.target.matches('.recipe__love, .recipe__love *')) {
        // Add Likes
        controlLikes();
    }
});

// 156 03:45