// npm requirements
const {table} = require("table");
const mysql = require("mysql");
// module requirements
const inq = require("./inquirerCustomer.js")
// establish a connection with mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
// export the function to purchase an item
module.exports.itemPurchased = function(item, amount) {
    let newAmt = parseInt(item.stock_quantity) - parseInt(amount);
    let query = `UPDATE products SET ? WHERE ?`;
    connection.query(query, [
        {
            stock_quantity: newAmt
        },
        {
            id: item.id
        }
    ], function(err, res){
        if(err) throw err;
        console.log(`Thank you! Here are your ${amount} ${item.product_name}(s).`);
        inq.seeMenu();
    })
};
module.exports.updatedMenu = function() {
    console.log(`Updated Catalog:`)
    displayProducts();
};
// connect to the connection and do something
connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});
// function to display products to the user
function displayProducts() {
    let data = [];
    let output;
    let query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        if(err) throw err;
        let row = ["ID#", "PRODUCT", "DEPARTMENT", "PRICE", "QTY"];
        data.push(row);
        for (let i = 0; i < res.length; i++) {
            row = [];
            row.push(res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            data.push(row);
        }
        output = table(data);
        console.log(output);
        inq.askCustomer(res);
    })
};