// npm requirements
const {table} = require("table");
const mySquirrel = require("mysql");
// module requirements
const inq = require("./inquirerManager.js");
// establish a connection with mysql
const connection = mySquirrel.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
seeMenu();
function seeMenu() {
    connection.query("SELECT * FROM products", function(err, res){
        inq.menuOptions(res);
    });
};
function connectAndDisplay(query) {
    connection.query(query, function(err, res){
        let data = [];
        let output;
        if(err) throw err;
        let row = ["ID#", "PRODUCT", "DEPARTMENT", "PRICE", "QTY"];
        data.push(row);
        for (let i = 0; i < res.length; i++) {
            row = [];
            row.push(res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            data.push(row);
        };
        output = table(data);
        console.log(output);
        inq.menuOptions(res);
    })
}
// View Products for Sale
module.exports.viewProductsForSale = function() {
    let query = "SELECT * FROM products";
    connectAndDisplay(query);
};
// View Low Inventory
module.exports.viewLowInventory = function() {
    let query = "SELECT * FROM products WHERE stock_quantity<=5";
    connectAndDisplay(query);
};
// Add to Inventory
module.exports.addToInventory = function(item, amount){
    let newAmt = parseInt(item.stock_quantity) + parseInt(amount);
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
        console.log(`Thank you! There are now ${newAmt} ${item.product_name}(s) in the inventory.`);
        seeMenu();
    })
};
// Add New Product
module.exports.addNewProduct = function(name, department, price, amount){
    
};