var inquirer = require("inquirer");
var fs = require('fs');
var createHTML = require("create-html");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
var id = 0;

function askManager(){
   
    id++;

inquirer.prompt([
    {
        type: "input",
        name: "managerName",
        message: "What is the name of the manager of this team?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the email address of this manager?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is this manager's office number?"
    }
])
    .then(function(response){

       const managerInfo = new Manager(response.managerName, id, response.managerEmail, response.officeNumber); 
       var newName = managerInfo.getName();
       var newId = managerInfo.getId();
       var newEmail = managerInfo.getEmail();
       var newOfficeNumber = managerInfo.getOfficeNumber();
       var newRole = managerInfo.getRole();

       var html = createHTML({
           title: 'example',
           body: `<p>${newName}</p>
                    <p>${newId}</p>
                    <p>${newEmail}</p>
                    <p>${newOfficeNumber}</p>
                    <p>${newRole}</p>
           `
       });

       fs.writeFile('./templates/manager.html', html, function (err){
           if (err) console.log(err)
       });

    })

}

askManager();


