export default class OrdersModel {
    constructor(orderId, date, customerId, customerName, itemCode, itemName, price, itemQty, orderQty, subTotal) {
        this._orderId = orderId;
        this._date = date;
        this._customerId = customerId;
        this._customerName = customerName;
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._price = price;
        this._itemQty = itemQty;
        this._orderQty = orderQty;
        this._subTotal = subTotal;
    }

    get orderId() { return this._orderId; }
    set orderId(value) { this._orderId = value; }

    get date() { return this._date; }
    set date(value) { this._date = value; }

    get customerId() { return this._customerId; }
    set customerId(value) { this._customerId = value; }

    get customerName() { return this._customerName; }
    set customerName(value) { this._customerName = value; }

    get itemCode() { return this._itemCode; }
    set itemCode(value) { this._itemCode = value; }

    get itemName() { return this._itemName; }
    set itemName(value) { this._itemName = value; }

    get price() { return this._price; }
    set price(value) { this._price = value; }

    get itemQty() { return this._itemQty; }
    set itemQty(value) { this._itemQty = value; }

    get orderQty() { return this._orderQty; }
    set orderQty(value) { this._orderQty = value; }

    get subTotal() { return this._subTotal; }
    set subTotal(value) { this._subTotal = value; }
}
