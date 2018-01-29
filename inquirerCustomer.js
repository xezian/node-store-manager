const inquirer = require("inquirer");
module.exports.askCustomer = function(items) {
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
                console.log(`OK! Looks like you want to buy the ${productName}.`);
                confirmPurchase(items[i]);
                return;
            } 
        }
        console.log(`Sorry! I was unable to locate a product in our inventory with ID# ${ID}`);
    })
};
function confirmPurchase(item){
    inquirer.prompt([
        {
            message: "Is that correct?",
            type: "input",
            name: "doYouWannaBuy",
            default: true
        },
        {
            when: function(answers){
                if (answers.doYouWannaBuy) {
                    return true;
                }
            },
            message: `How many ${item.product_name} do you want to buy?`,
            type: "input",
            name: "howMany",
            default: 1
        }
    ]).then(function(answers){
        if(!answers.doYouWannaBuy){
            return;
        } else {
            console.log(`OK! It looks like you want to buy ${answers.howMany} ${item.product_name}.`)
            confirmQuantity(item, answers.howMany);
        }
    })
}
function confirmQuantity(item, amount){
    inquirer.prompt([
        {
            message:"Is that correct?",
            type: "input",
            name: "rightAmount",
            default: true
        }
    ]).then(function(answer){
        console.log(`Splendid! ${amount} ${item.product_name} it shall be`)
    })
}