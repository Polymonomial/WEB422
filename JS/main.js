/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Brendan Chang__ Student ID: _105403182___ Date: ___31/1/2020____
*
*
********************************************************************************/ 
var saleData = [];
let page = 1;
let perPage = 10;
let saleTableTemplate = _.template(`
    <% _.forEach(sales, function(sale){ %>
        <tr data-id="<%- sale._id %>">
            <td><%- sale.customer.email %></td>
            <td><%- sale.storeLocation %></td>
            <td><%- sale.items.length %></td>
            <td><%- moment.utc(sale.saleDate).local().format('LLLL') %></td>
        </tr>
    <% }); %>

`);
let saleModalBodyTemplate = _.template(`
    <h4>Customer</h4>
    <strong>email:</strong> <%- email %><br>
    <strong>age:</strong> <%- age %><br>
    <strong>satisfaction:</strong> <%- satisfaction %>/5
    <br><br>
    <h4>items: $ <%- total %></h4>
    <table class="table">
        <thead>
            <th>
                <tr>Product Name &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp     &nbsp &nbsp &nbsp &nbsp    &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp    &nbsp &nbsp &nbsp &nbsp</tr>
                <tr>Quantity  &nbsp &nbsp &nbsp &nbsp  &nbsp </tr>
                <tr>Price</tr>
            <th>
        </head>
        <tbody>
        <% _.forEach(items, function(item){ %>
            <tr>
                <td><%- item.name %></td>
                <td><%- item.quantity %></td>
                <td><%- item.price %></td>
            <tr>
       <% }); %>
        </tbody>
    </table>
            
`);

let loadSaleData = function(){
    console.log("DOM is ready2!");
    fetch(`https://stark-lake-58044.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`)
        .then((response)=> response.json())
        .then((data)=>{
            saleData = data;
            let saleTable = saleTableTemplate({sales: data});
            console.log(page);
            $("#sales-table tbody").html(saleTable);
            $("#CurrentPage").html(page)
            //TODO set current page
        })
}

$(function(){
    console.log("DOM is ready!");

    loadSaleData();

    $("#sales-table tbody").on("click", "tr", function(){
        let clickedid = $(this).attr("data-id");
        console.log(clickedid);
        let clickedSale = _.find(saleData, {"_id": clickedid});
        console.log(clickedSale.items[0].price);
        console.log(clickedSale.items[0].quantity);
        let total = 0;
        _.forEach(clickedSale.items, function(item){
            total += (item.price*item.quantity);
        });
        console.log(total);
        $("#sale-modal h4").html(clickedSale._id);
        $("#sale-modal .modal-body").html(saleModalBodyTemplate({'email': clickedSale.customer.email, 'age': clickedSale.customer.age, 'satisfaction': clickedSale.customer.satisfaction, 'total': total.toFixed(2), 'items': clickedSale.items}));
        $("#sale-modal").modal({
            backdrop: 'static', 
            keyboard: false 
        });
    })

    $("#PreviousPage").on("click", function(){
        
        if(page > 1){
            page--;
        }
        loadSaleData();
    })

    $("#NextPage").on("click", function(){
        page++;
        loadSaleData();
    })
});