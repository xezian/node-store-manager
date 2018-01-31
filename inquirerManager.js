const inquirer = require("inquirer");
const bMan = require("./bamazonManager");
// inquirer functions to offer options to a manager, ultimately each path leads to bMan which is where we interact with the mysql database
// main menu (takes 'items' for reference)
function menuOptions(items){
    inquirer.prompt([
        {
            message: "Welcome to Bamazon Manager. What would you like to do?",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Quit Bamazon Manager"],
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
            case "Quit Bamazon Manager":
                process.exit();
                break;
        }
    })
};
// which item should we add inventory for?
function whatToAdd(items){
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
        if(isNaN(answer.amount)){
            console.log(`Sorry friend. ${answer.amount} doesn't seem to be a number.`)
            confirmAdd(item);
            return;
        }else{
            let amt = parseInt(answer.amount);
            bMan.addToInventory(item, amt);
        }
    })
};
// inquirer path below to get all the info needed to create a whole new product to put into an existing or a new department. This way we can call addNewProduct(name, dept, price, amount)
// asks for the name and checks the name
function whatNewProduct(items){
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
            message: `HOW EXCITING! Please begin by providing the new product's name:`,
            name: "whatName",
            type: "input"   
        }
    ]).then(function(answer){
        let whatToAdd = answer.whatName.trim();
        if(nameArray.includes(whatToAdd)){
            console.log("But we already have that product. Please consider adding to the inventory instead!");
            whatNewProduct(items);
            return;
        }
        console.log(`Cool cool. Lets add some ${answer.whatName}`);
        whatDepartment(deptArray, whatToAdd);
    })
};
// name is good. asks for the department provides list of departments with CREATE NEW DEPARTMENT option
function whatDepartment(deps, name){
    deps.push("Create New Department");
    inquirer.prompt([
        {
            message: `And what department should I put that into?`,
            name: "deptOfChoice",
            type: "list",
            choices: deps,
        }
    ]).then(function(answer){
        let whichOne = answer.deptOfChoice;
        if(whichOne==="Create New Department"){
            createNewDepartment(deps, name);
        }else{
            console.log(`Great, I'll put it in ${whichOne}`);
            priceAndQuantity(name, whichOne);
        }
    })
};
// makes new department if requested and checks the new name against existing departments
function createNewDepartment(deps, name){
    inquirer.prompt([
        {
            message: `OK. What should the new Department be called?`,
            name: `newDepartment`,
            type: `input`,
        }
    ]).then(function(answer){
        let whichOne = answer.newDepartment.trim();
        if(deps.includes(whichOne)){
            console.log(`Don't be silly, the ${whichOne} department already exists!`);
            whatDepartment(deps, name);
        }else{
            console.log(`Great, I'll create ${whichOne} now, and put it in there`);
            priceAndQuantity(name, whichOne);
        }
    })
};
// asks for the cost and how many to add
function priceAndQuantity(name, dept){
    inquirer.prompt([
        {
            message: `OK. What is the cost for each ${name}? $`,
            type: "input",
            name: "howMuch"
        },
        {
            when: function(answer) {
                let amt = answer.howMuch;
                if(isNaN(amt)){
                    return false;
                } else {
                    return true;
                }
            },
            message: function(answer){
                return `Alright cool. Almost done. Lastly, how many ${name} will you be adding to ${dept} for [$${answer.howMuch}] apiece?`;
            },
            type: "input",
            name: "howMany"
        }
    ]).then(function(answers){
        let price, amount;
        if(isNaN(answers.howMuch)||isNaN(answers.howMany)){
            console.log(`That doesn't look like a real number!`);
            priceAndQuantity(name, dept);
        }else if(price<1){
            console.log(`Please enter a price of 1 or higher`)
            priceAndQuantity(name, dept);
        }else if(amount<1){
            console.log(`Please enter an amount of 1 or more`)
            priceAndQuantity(name, dept);
        }else{
            price = answers.howMuch;
            amount = parseInt(answers.howMany);
            bMan.addNewProduct(name, dept, price, amount);
        }
    })
};
module.exports = {
    menuOptions: menuOptions,
};