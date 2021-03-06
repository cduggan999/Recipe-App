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

        // Add to localStorage so data is persistent
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        // Takes start index and number to cut from array
        this.likes.splice(index, 1);

        // Add to localStorage so data is persistent
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1 ? true : false;
    }

    getNumberLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    } 

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Backup likes from local storage
        if (storage) this.likes = storage;
    }
}