import { elements } from './base';
import { trimRecipeTitle } from './searchView';

export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

 export const toogleLikeMenu = numberOfLikes => {
    elements.likesField.style.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${trimRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
}; 

export const deleteLike = id => {
    const element = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (element) element.parentElement.removeChild();
}; 