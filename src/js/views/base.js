export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    searchBtnInline: document.querySelector('.btn-inline'),
    recipe: document.querySelector('.recipe')
};

export const elementStrings = {
    spinner: 'spinner'
};

export const renderSpinner = parent => {
    const spinner = `
        <div class="${elementStrings.spinner}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
    `;
    parent.insertAdjacentHTML('afterbegin', spinner);
};

export const removeSpinner = parent => {
    const spinner = document.querySelector(`.${elementStrings.spinner}`);
    if (spinner) {
        spinner.parentElement.removeChild(spinner);
    }
};
