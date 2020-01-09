import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value='';
};

export const clearResults = () => {
    elements.searchResList.innerHTML='';
}

const renderRecipe = recipe => {
    const size = '90x90';
    const type = '.jpg';
    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="https://spoonacular.com/recipeImages/${recipe.id}-${size}${type}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title} ...</h4>
                    <p class="results__ready">Ready in ${recipe.readyInMinutes} minutes.</p>
                    <p class="results__servings">Servings: ${recipe.servings}</p>
                </div>
            </a>
        </li>
    `; 
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    // Loop through each item and print to screen
    console.log(recipes);
    recipes.forEach(renderRecipe);
};