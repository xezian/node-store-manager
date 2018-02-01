// npms
const mySeaQuail = require(`mysql`);
const {table} = require(`table`);
// modules
const inq = require(`./inquirerSupervisor.js`);
// establish a connection with mysql
const connection = mySeaQuail.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
connection.connect(function(err){
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    console.log(`Welcome to Bamazon Supervisor`);
    showMenu();
});
function showMenu(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        let products = res;
        connection.query("SELECT * FROM departments", function(err, restwo){
            if(err)throw err;
            let depts = restwo;
            inq.menuOptions(products, depts);
        })
    });
};
module.exports.createDept = function(name, overhead) {
    let query = (`INSERT INTO departments (department_name, overhead_costs) VALUES ("${name}",${overhead})`)
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(`${name} Department created`);
        showMenu();
    })
}
module.exports.superTable = function(products, depts) {
    let data = [];
    let output;
    let row = ["DeptID#","Name","Overhead","Sales","Profits"];
    data.push(row);
    for (let i = 0; i < depts.length; i++) {
        row = [];
        row.push(depts[i].department_id, depts[i].department_name, depts[i].overhead_costs);
        let totalSales = 0;
        let totalProfits = 0;
        for (let j = 0; j < products.length; j++) {
            if (depts[i].department_name===products[j].department_name) {
                totalSales = totalSales + parseInt(products[i].product_sales);
            }
        }
        totalProfits = totalSales - parseInt(depts[i].overhead_costs);
        row.push(totalSales, totalProfits);
        data.push(row);
    };
    output = table(data);
    console.log(output);
    showMenu();
};
