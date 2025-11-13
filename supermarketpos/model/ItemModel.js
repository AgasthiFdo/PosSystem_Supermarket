export default class ItemModel {
    constructor (itemCode, itemName, description, price, qty) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._description = description;
        this._price = price;
        this._qty = qty;

    }
    get itemCode () {
        return this._itemCode;
    }
    set itemCode (value) {
        this._itemCode = value;
    }
    get itemName () {
        return this._itemName;
    }
    set itemName (value) {
        this._itemName = value;
    }
    get description () {
        return this._description;
    }
    set description (value) {
        this._description = value;
    }
    get price () {
        return this._price;
    }
    set price (value) {
        this._price = value;
    }
    get qty () {
        return this._qty;
    }
    set qty (value) {
        this._qty = value;
    }
}