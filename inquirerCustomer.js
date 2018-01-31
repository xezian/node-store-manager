const inquirer = require("inquirer");
const bCus = require("./bamazonCustomer.js")
function askCustomer(items) {
    inquirer.prompt([
        {
            message: "Please indicate the ID# of the product you are purchasing",
            name: "buyerPrompt",
            type: "input",
            default: 0
        }
    ]).then(function(response){
        let ID = response.buyerPrompt;
        for(let i = 0; i < items.length; i++){
            if(items[i].id==response.buyerPrompt) {
                let productName = items[i].product_name;
                if(items[i].stock_quantity <= 0) {
                    console.log(`We are so sorry! There are no ${productName} in our inventory right now.`);
                    askCustomer(items);    
                    return;
                } else {
                    console.log(`OK! Looks like you want to buy the ${productName}.`);
                    confirmPurchase(items, items[i]);
                    return;
                }
            } 
        };
        console.log(`Sorry! I was unable to locate a product in our inventory with ID# ${ID}`);
        askCustomer(items);
    })
};
function confirmPurchase(items, item){
    inquirer.prompt([
        {
            message: "Is that correct?",
            type: "confirm",
            name: "doYouWannaBuy",
            default: true
        }
    ]).then(function(answer){
        if(answer.doYouWannaBuy){
            confirmAmount(item);
        } else {
            askCustomer(items);
        }
    })
}
function confirmAmount(item) {
    inquirer.prompt([
        {
            message: `How many ${item.product_name} do you want to buy?`,
            type: "input",
            name: "howMany",
            default: 1
        }
    ]).then(function(answers){
        let num = parseFloat(answers.howMany);
        let itemName = item.product_name;
        let costPer = item.price;
        let qtyInStock = item.stock_quantity; 
        if (!Number.isInteger(num)) {
            console.log(`Sorry! "${num}" is not a valid input.`);
            confirmAmount(item);
        } else if(num <= 0) {
            console.log(`Sorry we can only sell you quantities of 1 or more ${itemName}.`);
            confirmAmount(item);
        } else if(num > qtyInStock) {
            console.log(`Sorry! There's only ${qtyInStock} ${itemName} in our inventory right now.`);
            confirmAmount(item);
        } else {
            let total = costPer * num;
            console.log(`OK! It looks like you want to buy ${num} ${itemName}.`);
            console.log(`The total cost for those items will be: [$${total}]`)
            confirmQuantity(item, num, total);
        }
    })
}
function confirmQuantity(item, amount, total){
    inquirer.prompt([
        {
            message:`Ready to buy ${amount} ${item.product_name} for [$${total}]?`,
            type: "list",
            name: "buyIt",
            choices: ["Yeah!", "Oops, no. Let's go back."],
            default: "Yeah!"
        },
    ]).then(function(answer){
        if(answer.buyIt==="Oops, no. Let's go back."){
            confirmAmount(item);
            return;
        } else if (answer.buyIt==="Yeah!") {
            bCus.itemPurchased(item, amount);
        }
    })
}
function seeMenu() {
    inquirer.prompt([
        {
            message:"Would you like to see an updated catalog?",
            type: "confirm",
            name:"refreshMenu",
            default: true,
        },
    ]).then(function(answer){
        if(answer.refreshMenu) {
            bCus.updatedMenu();
        }
    })
};
module.exports = {
    seeMenu: seeMenu,
    askCustomer: askCustomer,
};