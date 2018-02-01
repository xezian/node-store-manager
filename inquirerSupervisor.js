// npm
const inquirer = require(`inquirer`);
// modules
const bSup = require(`./bamazonSupervisor.js`);
// inquirer functions
function menuOptions(products, depts){
    inquirer.prompt([
        {
            name: "supChoices",
            message: "Please select an option:",
            type: "list",
            choices: ["View Product Sales By Department","Create New Department","Quit Bamazon Supervisor"], 
        }
    ]).then(function(answers){
        switch(answers.supChoices) {
            case "View Product Sales By Department":
                viewDeptSales(products, depts);
                break;
            case "Create New Department":
                createNewDept(depts);
                break;
            case "Quit Bamazon Supervisor":
                process.exit();
                break;
        }   
    })
};
function viewDeptSales(products, depts){
    console.log(`Okay! Let's view sales by department!`);
    bSup.superTable(products, depts);
};
// makes new department if requested and checks the new name against existing departments
function createNewDept(depts) {
    let deptArr =[];
    for(let i = 0; i < depts.length; i++) {
        deptArr.push(depts[i].department_name);
    }
    inquirer.prompt([
        {
            message: `OK. What should the new Department be called?`,
            name: `newDepartment`,
            type: `input`,
        }
    ]).then(function(answer){
        let whichOne = answer.newDepartment.trim();
        if(deptArr.includes(whichOne)){
            console.log(`Don't be silly, the ${whichOne} department already exists!`);
            whatDepartment(depts);
        }else{
            console.log(`Great, I'll create ${whichOne} now!`);
            aboutOverhead(whichOne);
        }
    })
};
function aboutOverhead(name) {
    inquirer.prompt([
        {
            message:"How much overhead will this new Department be carrying?",
            name:"overhead",
            type:"input",
        }
    ]).then(function(answer){
        if(isNaN(answer.overhead)){
            console.log(`But that is no number amount!`);
            aboutOverhead(name);
            return;
        } else {
            console.log(`Great! I'll create the ${name} Department now with ${answer.overhead} overhead`);
            bSup.createDept(name, answer.overhead);
        }
    })
}
module.exports = {
    menuOptions: menuOptions,
};
