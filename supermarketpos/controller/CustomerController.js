import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";




$('#customer-save').on("click", function () {
    let customerId = $("#id").val();
    let customerName = $('#name').val();
    let address = $('#address').val();
    let number = $('#number').val();

    if(customerId === '' || customerName === '' || address === '' || number === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }else {
        let customer_data = new CustomerModel(customerId, customerName, address, number);
        customer_db.push(customer_data);
        clearForm();
        console.log(customer_db);
        loadCustomerDropdown();
        loadCustomerTableData();
        $('#selectCustomerId').append($('<option>').text(customerId));
        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true

        })
        $('#customerCount').text(customer_db.length);
    }
});
function loadCustomerDropdown() {
    $('#selectCustomerId').empty();
    $('#selectCustomerId').append(`<option>Select Customer ID</option>`);
    customer_db.forEach(customer => {
        $('#selectCustomerId').append(
            $('<option>', {
                value: customer.customerId,
                text: customer.customerId,
            })
        );
    });
}




function loadCustomerTableData(){
             $('#customer-tbody').empty();
             customer_db.map((item, index) => {
                let id = item.customerId;
                 let customerName = item.customerName;
                 let address = item.address;
                 let phoneNumber = item.phoneNumber;

                 let data = `<tr>
                     <td>${id}</td>
                     <td>${customerName}</td>
                     <td>${address}</td>
                     <td>${phoneNumber}</td>
                 </tr>`

                 $('#customer-tbody').append(data);
             });
}
let selectedIndex = -1;
$('.cus-body').on('click', 'tr', function () {
     selectedIndex = $(this).index();
    let obj = customer_db[selectedIndex];

    let customerId = obj.customerId;
    let customerName = obj.customerName;
    let address = obj.address;
    let phoneNumber = obj.phoneNumber;

    $('#id').val(customerId);
    $('#name').val(customerName);
    $('#address').val(address);
    $('#number').val(phoneNumber);
})

const clearForm = () =>{
    $(`#id,#name,#address,#number`).val("");
}
$('#customer-clear').on('click', function () {
    clearForm();
});

$('#customer-update').on('click', function () {
    let customerId = $("#id").val();
    let customerName = $('#name').val();
    let address = $('#address').val();
    let number = $('#number').val();

    if(selectedIndex === -1){
        Swal.fire("Error", "Please select a customer to update", "error");
        return;
    }

    let updateCustomer = new CustomerModel(customerId, customerName, address, number);
    customer_db[selectedIndex] = updateCustomer;
    loadCustomerTableData();
    clearForm();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
    });
})

$('#customer-delete').on('click', function () {
    let customerId = $('#id').val();

    const index = customer_db.findIndex(item => item.customerId === customerId);

    if (index === -1) {
        clearForm();

        Swal.fire({
            title: "Item Not Found",
            text: "No customer found with the given ID.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return;
    }



    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            customer_db.splice(index, 1);////
            loadCustomerTableData();
            clearForm();
            loadCustomerDropdown();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            $('#customerCount').text(customer_db.length);
        }
    });
    $('#id').val('');
})

function isDuplicated(id){
    return customer_db.some(customer => customer.customerId === id);
}
function checkEmptyInputFields(checkId, checkName, checkAddress, checkNumber) {
    if(checkId && checkName && checkAddress && checkNumber){
        $('#customer-save').prop('disabled', false);
    }else {
        $('#customer-save').prop('disabled', true);
    }
}
function Validation(){
    let checkId = false;
    let checkName = false;
    let checkAddress = false;
    let checkNumber = false;

    $('#id').on('input', function(){
        let id = $('#id').val();
        if(isDuplicated(id)){
            $('.Cid').text('Duplicate Id').show();
            $('#id').css({border:'1px solid red'});
            checkId = false;
        }else if(/^C\d{3,}$/.test(id)){
            $('#id').css({border:'1px solid green'});
            $('.Cid').text('Invalid Id Format. (Ex : Coo1)').hide();
            checkId = true;
        }else {
            $('.Cid').text('Invalid Id Format. (Ex : Coo1)').show();
            $('#id').css({border:'1px solid red'});
            checkId = false;
        }
        checkEmptyInputFields(checkId, checkName, checkAddress, checkNumber);
    })
    $('#name').on('input', function(){
        let name = $('#name').val();
        if(/^[A-Za-z]+$/.test(name)){
            $('#name').css({border:'1px solid green'});
            $('.Cname').text('Invalid Id Format. (Ex : Dineth)').hide();
            checkName = true;
        }else {
            $('.Cname').text('Invalid Name Format. (Ex : Dineth)').show();
            $('#name').css({border:'1px solid red'});
            checkName = false;
        }
        checkEmptyInputFields(checkId, checkName, checkAddress, checkNumber);
    })
    $('#address').on('input', function(){
        let address = $('#address').val();
        if(address.length > 5){
            $('#address').css({border:'1px solid green'});
            $('.Caddress').text('Invalid Id Format.').hide();
            checkAddress = true;
        }else {
            $('.Caddress').text('Invalid Id Format.').show();
            $('#address').css({border:'1px solid red'});
            checkAddress = false;
        }
        checkEmptyInputFields(checkId, checkName, checkAddress, checkNumber);
    })
    $('#number').on('input', function(){
        let number = $('#number').val();
        if(/^\d{10}$/.test(number)){
            $('#number').css({border:'1px solid green'});
            $('.Cnumber').text('Invalid Number Format. (Ex : 0700000000)').hide();
            checkNumber = true;
        }else {
            $('.Cnumber').text('Invalid Id Format. (Ex : 0700000000)').show();
            $('#number').css({border:'1px solid red'});
            checkNumber = false;
        }
        checkEmptyInputFields(checkId, checkName, checkAddress, checkNumber);
    })
}
Validation('#id', '#name', '#address', '#number', '#customer-save');

function searchCustomer(keyword) {
    $('#customer-tbody').empty();
    let filteredCustomers = customer_db.filter(customer => {
        return customer.customerId.includes(keyword) ||
            customer.customerName.includes(keyword) ||
            customer.address.includes(keyword) ||
            customer.phoneNumber.includes(keyword);
    });

    if (filteredCustomers.length === 0) {
        $('#customer-tbody').append(`<tr><td colspan="4" class="text-center text-danger">No results found</td></tr>`);
    } else {
        filteredCustomers.forEach(item => {
            let data = `<tr>
                <td>${item.customerId}</td>
                <td>${item.customerName}</td>
                <td>${item.address}</td>
                <td>${item.phoneNumber}</td>
            </tr>`;

            $('#customer-tbody').append(data);//
        });
    }
}
$('#button-addonC').on('click', function () {
    let keyword = $('#inputSearch').val();
    searchCustomer(keyword);
});


