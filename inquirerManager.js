const inquirer = require("inquirer");
const bMan = require("./bamazonManager");
// functions are fun
function menuOptions(items) {
    inquirer.prompt([
        {
            message: "Hello Bamazon Manager. What would you like to do?",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
            name: "whichChoiceManager"
        }
    ]).then(function(answer){
        switch (answer.whichChoiceManager) {
            case "View Products for Sale":
                bMan.viewProductsForSale();
                break;
            case "View Low Inventory":
                bMan.viewLowInventory();
                break;
            case "Add To Inventory":
                whatToAdd(items);
                break;
            case "Add New Product":
                whatNewProduct(items);
                break;
        }
    })
};
function whatToAdd(items) {
    inquirer.prompt([
        {
            message: "Please provide the ID# of the product that the inventory of is one to which you are adding.",
            name: "whichToAdd",
            type: "input",
            default: 0
        }
    ]).then(function(response){
        let ID = response.buyerPrompt;
        for(let i = 0; i < items.length; i++){
            if(items[i].id==response.whichToAdd) {
                let productName = items[i].product_name;
                console.log(`OK! Looks like you want to add to the ${productName} inventory.`);
                confirmAdd(items[i]);
                return;
            }
        };
        console.log(`Sorry! I was unable to locate a product in our inventory with ID# ${ID}`);
        whatToAdd(items);
    })
};
function confirmAdd(item){
    inquirer.prompt([
        {
            message: `What amount will you be increasing the inventory of ${item.product_name} by?`,
            name:"amount",
            type:"input",
            default: 0
        }
    ]).then(function(answer){
        bMan.addToInventory(item, answer.amount);
    })
};
function whatNewProduct(items) {
    let nameArray = [];
    let deptArray = [];
    for (let i = 0; i < items.length; i++) {
        nameArray.push(items[i].product_name);
        if(!deptArray.includes(items[i].department_name)){
            deptArray.push(items[i].department_name);
        }
    }
    inquirer.prompt([
        {
            message: `HOW EXCITING! Please begin by providing the new product's name`,
            name: "whatName",
            type: "input"   
        }
    ]).then(function(answer){
        if(nameArray.includes(answer.whatName)){
            console.log("But we already have that product. Please consider adding to the inventory instead!");
            whatNewProduct(items);
            return;
        }
        console.log(`Cool cool. Looks like you want to add some ${answer.whatName}`);
        whatDepartment(deptArray, answer.whatName);
    })
};
function whatDepartment(deps, name) {
    deps.push("Create New Department");
    inquirer.prompt([
        {
            message: `And what department should I put that into?`,
            name: "deptOfChoice",
            type: "list",
            choices: deps,
        }
    ]).then(function(answer){
        if(answer.deptOfChoice==="Create New Department"){
            console.log("TODO: CREATE NEW DEPARTMENT")
        } else {
            console.log(`ALRIGHT WE CAN PUT IT IN ${answer.deptOfChoice}`);
        }
    })
};
module.exports = {
    menuOptions: menuOptions,
};