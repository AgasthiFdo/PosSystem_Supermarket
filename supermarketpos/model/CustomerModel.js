export default class CustomerModel {
    constructor(customerId, customerName, address, phoneNumber) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._address = address;
        this._phoneNumber = phoneNumber;
    }

    get customerId() {
        return this._customerId;
    }
    set customerId(value) {
        this._customerId = value;
    }
    get customerName() {
        return this._customerName;
    }
    set customerName(value) {
        this._customerName = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }

}