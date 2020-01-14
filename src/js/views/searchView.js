import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value='';
};

/* export const clearResults = () => {
    elements.searchResList.innerHTML='';
} */
export const clearRecipes = () => {
    elements.searchResList.innerHTML='';
};

export const clearPages = () => {
    elements.searchResPages.innerHTML='';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    //css selector
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active')
}

// Trim title length to 20 characters or less
const trimRecipeTitle = (title, limit = 20) => {
    const trimmedTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                trimmedTitle.push(curr);
                // Incremented acc by 1 to respresent the extra space
                acc++;
            }
            return acc + curr.length;
        }, 0);

        // Return the trimmed title
        return `${trimmedTitle.join(' ')} ...`
    }
    return title;
};

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
                    <h4 class="results__name">${trimRecipeTitle(recipe.title)}</h4>
                    <p class="results__ready">Ready in ${recipe.readyInMinutes} minutes.</p>
                    <p class="results__servings">Servings: ${recipe.servings}</p>
                </div>
            </a>
        </li>
    `; 
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => {
    return `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;

};

const renderPageButtons = (page, numResults, resultsPerPage) => {
    const pages = Math.ceil(numResults / resultsPerPage);
    let button;

    if (page === 1 && page < pages) {
        // Only display next page
        button = createButton(page, 'next');
    }
    else if (page > 1 && page < pages) {
        // Display Previous and next pages
        button = `${createButton(page, 'prev')}
                  ${createButton(page, 'next')}
        `     
    }
    else if (page === pages && pages > 1) {
        // Only display previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // Clear the previous Search results
    clearRecipes();
    clearPages();
    // Loop through each item and print to screen
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);

    // Render page numbers if there is more that 1 page
    if (recipes.length > resultsPerPage) {
        renderPageButtons(page, recipes.length, resultsPerPage);
    }
};