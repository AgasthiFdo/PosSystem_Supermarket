export default class OrderDetailsModel {
    constructor(OrderId,Date,cusName,ItemName, Price,OrderQty,SubTotal,DiscountRate,Discount,FinalTotal) {
        this._OrderId = OrderId;
        this._Date = Date;
        this._cusName = cusName;
        this._ItemName = ItemName;
        this._Price = Price;
        this._OrderQty = OrderQty;
        this._SubTotal = SubTotal;
        this._DiscountRate = DiscountRate;
        this._Discount = Discount;
        this._FinalTotal = FinalTotal;
    }
    get OrderId () {
        return this._OrderId;
    }
    set OrderId (value) {
        this._OrderId = value;
    }
    get Date() {
        return this._Date;
    }
    set Date (value) {
        this._Date = value;
    }
    get cusName () {
        return this._cusName;
    }
    set cusName (value) {
        this._cusName = value;
    }
    get ItemName () {
        return this._ItemName;
    }
    set ItemName (value) {
        this._ItemName = value;
    }
    get Price () {
        return this._Price;
    }
    set Price (value) {
        this._Price = value;
    }
    get OrderQty () {
        return this._OrderQty;
    }
    set OrderQty (value) {
        this._OrderQty = value;
    }
    get SubTotal () {
        return this._SubTotal;
    }
    set SubTotal (value) {
        this._SubTotal = value;
    }
    get DiscountRate () {
        return this._DiscountRate;
    }
    set DiscountRate (value) {
        this._DiscountRate = value;
    }

    get Discount(){
        return this._Discount;
    }
    set Discount (value) {
        this._Discount = value;
    }

    get FinalTotal () {
        return this._FinalTotal;
    }
    set FinalTotal (value) {
        this._FinalTotal = value;
    }
}