import {customer_db, item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";


$('#item-save').on('click', function(){
    let  itemCode = $('#itemCode').val();
    let  itemName = $('#itemName').val();
    let  description = $('#description').val();
    let  price = $('#price').val();
    let  qty = $('#qty').val();

    if(itemCode === '' || itemName === '' || description === '' || price === '' || qty === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }else {
        let item_data = new ItemModel(itemCode, itemName, description, price, qty);
        item_db.push(item_data);
        clearForm();
        console.log(item_db);
        loadItemDropdown();
        loadItemTableData();
        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
        $('#itemCount').text(item_db.length);
    }
});

function loadItemDropdown() {
    $('#selectItemCode').empty();
    $('#selectItemCode').append(`<option>Select Item ID</option>`);
    item_db.forEach(item => {
        $('#selectItemCode').append(
            $('<option>', {
                value: item.itemCode,
                text: item.itemCode
            })
        );
    });
}

function loadItemTableData(){
    $('.item-tbody').empty();
    item_db.map((item, index) => {
        let itemCode = item.itemCode;
        let itemName = item.itemName;
        let description = item.description;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
             <td>${itemCode}</td>
             <td>${itemName}</td>
             <td>${description}</td>
             <td>${price}</td>
             <td>${qty}</td>
         </tr>`

        $('.item-tbody').append(data);
    });

}

let selectedIndex = -1;
$('.item-tbody').on('click', 'tr', function () {
     selectedIndex = $(this).index();
    let obj = item_db[selectedIndex];

    let itemCode = obj.itemCode;
    let itemName = obj.itemName;
    let description = obj.description;
    let price = obj.price;
    let qty = obj.qty;

    $('#itemCode').val(itemCode);
    $('#itemName').val(itemName);
    $('#description').val(description);
    $('#price').val(price);
    $('#qty').val(qty);
});

const clearForm = () =>{
    $(`#itemCode,#itemName,#description,#price,#qty`).val("");
}

$('#item-clear').on('click', function(){
    clearForm();
    });
$('#item-update').on('click', function () {
    let  itemCode = $('#itemCode').val();
    let  itemName = $('#itemName').val();
    let  description = $('#description').val();
    let  price = $('#price').val();
    let  qty = $('#qty').val();

    if(selectedIndex === -1){
        Swal.fire("Error", "Please select a customer to update", "error");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You want to update this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let updatedItem = new ItemModel(itemCode, itemName, description, price, qty);
            item_db[selectedIndex] = updatedItem;
            loadItemTableData();
            loadItemDropdown();
            clearForm();
            Swal.fire("Updated!", "Item has been updated successfully.", "success");
        }
    });
})
$('#item-delete').on('click', function () {
    let itemCode = $('#itemCode').val();

    const index = item_db.findIndex(item => item.itemCode === itemCode);

    if (index === -1) {
        clearForm();

        Swal.fire({
            title: "Item Not Found",
            text: "No Item found with the given ID.",
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

            item_db.splice(index, 1);
            loadItemTableData();
            clearForm();
            loadItemDropdown();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            $('#itemCount').text(item_db.length);
        }
    });
    $('#itemCode').val('');
})


function isDuplicated(code){
    return item_db.some(Item => Item.itemCode() === code);
}
function checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty) {
    if(checkCode && checkName && checkDescription && checkPrice && checkQty) {
        $('#item-save').prop('disabled', false);
    }else {
        $('#item-save').prop('disabled', true);
    }
}
function Validation(){
    let checkCode = false;
    let checkName = false;
    let checkDescription = false;
    let checkPrice = false;
    let checkQty = false;

    $('#itemCode').on('input', function(){
        let code = $('#itemCode').val();
        if(isDuplicated(code)){
            $('.Icode').text('Duplicate ItemCode').show();
            $('#itemCode').css({border:'1px solid red'});
            checkCode = false;
        }else if(/^I\d{3,}$/.test(code)){
            $('#itemCode').css({border:'1px solid green'});
            $('.Icode').text('Invalid itemCode Format. (Ex : Ioo1)').hide();
            checkCode = true;
        }else {
            $('.Icode').text('Invalid ItemCode Format. (Ex : Ioo1)').show();
            $('#itemCode').css({border:'1px solid red'});
            checkCode = false;
        }
        checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty);
    })
    $('#itemName').on('input', function(){
        let name = $('#itemName').val();
        if(/^[A-Za-z]+$/.test(name)){
            $('#itemName').css({border:'1px solid green'});
            $('.Iname').text('Invalid Name Format.Only use letters').hide();
            checkName = true;
        }else {
            $('.Iname').text('Invalid Name Format.Only use letters)').show();
            $('#itemName').css({border:'1px solid red'});
            checkName = false;
        }
        checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty);
    })
    $('#description').on('input', function(){
        let description = $('#description').val();
        if(/^[A-Za-z0-9]+( [A-Za-z0-9]+)*$/.test(description)){
            $('#description').css({border:'1px solid green'});
            $('.Idescription').text('Invalid Id Format.').hide();
            checkDescription = true;
        }else {
            $('.Idescription').text('Invalid Id Format.').show();
            $('#description').css({border:'1px solid red'});
            checkDescription = false;
        }
        checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty);
    })
    $('#price').on('input', function(){
        let price = $('#price').val();
        if(/^\d+\.\d{2}$/.test(price)){
            $('#price').css({border:'1px solid green'});
            $('.Ipricer').text('Invalid Price Format. (Ex : 000.00)').hide();
            checkPrice = true;
        }else {
            $('.Ipricer').text('Invalid Price Format. (Ex : 000.00').show();
            $('#price').css({border:'1px solid red'});
            checkPrice = false;
        }
        checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty);
    })
    $('#qty').on('input', function(){
        let qty = $('#qty').val();
        if(/^[1-9]\d*$/.test(qty)){
            $('#qty').css({border:'1px solid green'});
            $('.Iqty').text('Invalid QTY Format.').hide();
            checkQty = true;
        }else {
            $('.Iqty').text('Invalid QTY Format.').show();
            $('#qty').css({border:'1px solid red'});
            checkQty = false;
        }
        checkEmptyInputFields(checkCode, checkName, checkDescription, checkPrice, checkQty);
    })
}
Validation('#itemCode', '#itemName', '#description', '#price', '#qty','#item-save');

function searchItem(keyword) {
    $('.item-tbody').empty();
    let filteredItems = item_db.filter(item => {
        return item.itemCode.includes(keyword) ||
            item.itemName.includes(keyword) ||
            item.description.includes(keyword) ||
            item.price.includes(keyword) ||
            item.qty.includes(keyword);
    });

    if (filteredItems.length === 0) {
        $('.item-tbody').append(`<tr><td colspan="5" class="text-center text-danger">No results found</td></tr>`);
    } else {
        filteredItems.forEach(item => {
            let data = `<tr>
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
            </tr>`;

            $('.item-tbody').append(data);
        });
    }
}
$('#button-addonI').on('click', function () {
    let keyword = $('#itemSearch').val();
    searchItem(keyword);
});


