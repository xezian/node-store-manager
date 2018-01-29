// requirements
const {table} = require("table");
const mysql = require("mysql");
let data = [];
let output;
// establish a connection with mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
// connect to the connection and do something
connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});
// function to display products to the user
function displayProducts() {
    let query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        let row = ["ID", "Product", "Department", "Price", "Qty"];
        data.push(row);
        for (let i = 0; i < res.length; i++) {
            row = [];
            row.push(res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            data.push(row);
        }
        output = table(data);
        console.log(output);
    })
    connection.end();
};