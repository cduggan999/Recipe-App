import uniqid from 'uniqid';

export default class Likes {
    constructor() {
        this.likes = [];
    }

   addLike(id, title, publisher, image) {
        const like = {
            id,
            title,
            publisher,
            image
        }
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        // Takes start index and number to cut from array
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1 ? true : false;
    }

    getNumberLikes() {
        return this.likes.length;
    }

    /*updateAmount(id, newAmount) {
        // Finds item with matching id and updates amount
        this.items.find(el => el.id === id).amount = newAmount;
    } */
}