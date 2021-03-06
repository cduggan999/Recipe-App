import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(amount, unit, ingredient) {
        const item = {
            id: uniqid(),
            amount,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        // Takes start index and number to cut from array
        this.items.splice(index, 1);
    }

    updateAmount(id, newAmount) {
        // Finds item with matching id and updates amount
        this.items.find(el => el.id === id).amount = newAmount;
    }
}