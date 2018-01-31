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
connection.connect(function(err) {
    if(err) throw err;
    seeMenu();
});
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
    let newAmt = item.stock_quantity + amount;
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
    connection.query(`SELECT * FROM products`, function(err, res){
        let deptArr = [];
        let deptId; 
        if(err) throw err;
        for(let i = 0; i < res.length; i++){
            deptArr.push(res[i].department_name);
        };
        if(deptArr.includes(department)){
            for(let i = 0; i < res.length; i++) {
                if(res[i].department_name===department){
                    deptId = res[i].id;
                }
            }
        }else{
            deptId = res.length + 1;
        };
        console.log(deptId);
        updateTable(name, department, price, amount, deptId);
    })
};
function updateTable(name, department, price, amount, deptId) {
    let query = `UPDATE products SET id = id + 1 WHERE id >= ${deptId} ORDER BY id DESC`
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log(res);
        queryNewProduct(name, department, price, amount, deptId);
    })
}
function queryNewProduct(name, department, price, amount, deptId) {
    let query = `INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (${deptId}, "${name}", "${department}", ${price}, ${amount})`;
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log(`Thank you! There are now ${amount} ${name}(s) in ${department} for [$${price}] apiece`);
        seeMenu();
    })
};