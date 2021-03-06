import axios from 'axios';
import { key, url } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
//https://api.spoonacular.com/recipes/559251/information?apiKey=790892ed1c07443b8710d5c4d9f168b3
    async getRecipe() {
        const maxResults = 50;
        try {
            const res = await axios(`${url}${this.id}/information?apiKey=${key}`);
            this.title = res.data.title;
            this.publisher = res.data.creditsText;
            this.image = res.data.image;
            this.sourceUrl = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.servings = res.data.servings;
            this.prepTime = res.data.preparationMinutes;
            this.cookTime = res.data.cookingMinutes;
        }
        catch (error) {
            alert(error);
        }   
    }

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings-1 : this.servings+1;

        // Ingredients
        this.ingredients.forEach(ing => {
            
            ing.amount *= (newServings/this.servings)
        });

        this.servings = newServings;
    }
}