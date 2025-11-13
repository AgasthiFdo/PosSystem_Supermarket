import { orders_db, customer_db, item_db, orderDetails_db } from "../db/db.js";
import OrdersModel from "../model/OrdersModel.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";

// ======================== Load Customer Data ========================
$('#selectCustomerId').change(function () {
    const selectedId = $(this).val();
    const customer = customer_db.find(c => c.customerId === selectedId);

    if (customer) {
        $('#cusName').val(customer.customerName);
        $('#cusAddress').val(customer.address);
        $('#cusNumber').val(customer.phoneNumber);
    }
});

// ======================== Load Item Data ========================
$('#selectItemCode').change(function () {
    const selectedCode = $(this).val();
    const item = item_db.find(i => i.itemCode === selectedCode);

    if (item) {
        $('#OrItemName').val(item.itemName);
        $('#OrPrice').val(item.price);
        $('#ItemQty').val(item.qty);
    }
});

// ======================== Generate New Order ID ========================
export function generateOrderId() {
    let lastOrder = orders_db[orders_db.length - 1];
    let newId = "OD001";

    if (lastOrder) {
        let lastNum = parseInt(lastOrder.orderId.substring(2)) + 1;
        newId = "OD" + lastNum.toString().padStart(3, "0");
    }
    $("#orderId").val(newId);
}

// ======================== Add to Cart ========================
$('#card').on('click', function () {
    const orderId = $('#orderId').val();
    const date = $('#date').val();
    const customerId = $('#selectCustomerId').val();
    const customerName = $('#cusName').val();
    const itemCode = $('#selectItemCode').val();
    const itemName = $('#OrItemName').val();
    const price = parseFloat($('#OrPrice').val());
    const itemQty = parseInt($('#ItemQty').val());
    const orderQty = parseInt($('#OrQty').val());

    if (!orderId || !date || !customerId || !itemCode || !price || !orderQty) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please fill out all fields.'
        });
        return;
    }

    if (orderQty > itemQty) {
        Swal.fire({
            icon: 'warning',
            title: 'Insufficient Quantity',
            text: 'Order quantity exceeds available stock.'
        });
        return;
    }

    const subTotal = price * orderQty;
    const order = new OrdersModel(orderId, date, customerId, customerName, itemCode, itemName, price, itemQty, orderQty, subTotal);
    orders_db.push(order);

    // Update Item Stock
    const item = item_db.find(i => i.itemCode === itemCode);
    if (item) item.qty -= orderQty;

    updateItemTable();
    loadCartData();

    Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Item added to cart successfully.'
    });
});

// ======================== Load Cart ========================
export function loadCartData() {
    $('#CartBody').empty();
    let cartTotal = 0;

    orders_db.forEach(order => {
        cartTotal += order.subTotal;

        $('#CartBody').append(`
            <tr>
                <td>${order.itemCode}</td>
                <td>${order.itemName}</td>
                <td>${order.price}</td>
                <td>${order.orderQty}</td>
                <td>${order.subTotal}</td>
            </tr>
        `);
    });

    const discountRate = parseFloat($('#rate').val()) || 0;
    const discount = (cartTotal * discountRate) / 100;
    const total = cartTotal - discount;

    $('#subTotal').text(`Sub Total : ${cartTotal.toFixed(2)}`);
    $('#discount').text(`Discount : ${discount.toFixed(2)}`);
    $('#total').text(`Total : ${total.toFixed(2)}`);
}

$('#rate').on('input', loadCartData);

// ======================== Update Item Table ========================
function updateItemTable() {
    $('.item-tbody').empty();
    item_db.forEach(item => {
        $('.item-tbody').append(`
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
            </tr>
        `);
    });
}

// ======================== Purchase Order ========================
$('.purche').on('click', function () {
    const orderId = $('#orderId').val();
    const date = $('#date').val();
    const customerName = $('#cusName').val();
    const subTotal = parseFloat($('#subTotal').text().split(':')[1]) || 0;
    const discountRate = parseFloat($('#rate').val()) || 0;
    const discount = parseFloat($('#discount').text().split(':')[1]) || 0;
    const total = parseFloat($('#total').text().split(':')[1]) || 0;

    if (!orderId || !date || !customerName) {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Data',
            text: 'Please check all fields before completing purchase.'
        });
        return;
    }

    Swal.fire({
        title: 'Confirm Purchase',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, confirm'
    }).then(result => {
        if (result.isConfirmed) {
            const orderDetails = new OrderDetailsModel(orderId, date, customerName, total, discountRate, discount, subTotal);
            orderDetails_db.push(orderDetails);

            Swal.fire({
                icon: 'success',
                title: 'Purchase Complete',
                text: 'Order successfully completed!'
            });

            orders_db.length = 0; // clear cart
            loadCartData();
            updateItemTable();
            generateOrderId();
        }
    });
});
