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
    },
    {
        type: "list",
        name: "employeeTypePicker",
        message: "Which type of worker would you like to add next?",
        choices: [
            "Engineer",
            "Intern",
            "Normal Employee",
            "I don't want to add anymore employees, set me free!"
        ]
    },
    
])

    .then(function(response){

        if(response.employeeTypePicker == "Engineer"){
            engineerPrompt();
        }else if (response.employeeTypePicker == "Intern"){
            internPrompt();
        }else if (response.employeeTypePicker == "Normal Employee"){
            normalEmployeePrompt();
        }

       const managerInfo = new Manager(response.managerName, id, response.managerEmail, response.officeNumber); 
       var newName = managerInfo.getName();
       var newId = managerInfo.getId();
       var newEmail = managerInfo.getEmail();
       var newOfficeNumber = managerInfo.getOfficeNumber();
       var newRole = managerInfo.getRole();

       var html = createHTML({
           title: 'My Team',
           css: ['https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css','style.css'],
           head: '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>',
           body: `
                    <h1 id="header">My Team!</h1>
                        
           <div id="cardHolder">          
               <div class="columns is-multiline">
                   <div class="column is-one-third">
                       <div class="card">
                           <div class="card-content">
                               <div class="titleContent">      
                               <p id="bigtitle">${newName}</p>
                               <p id="smalltitle">${newRole}</p>
                                </div> 
                                <div class="otherContent">
                                <br>
                               <p>ID: ${newId}</p>
                               <br>
                               <p>Email: ${newEmail}</p>
                               <br>
                               <p>Office number: ${newOfficeNumber}</p>
                               <br>
                                </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
                    `
       });



       fs.writeFile('./templates/manager.html', html, function (err){
           if (err) console.log(err)
       });

    })

}

askManager();



function thenResponse(){

}


function engineerPrompt(){

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
            name: "github",
            message: "What is this engineer's github name?"
        },
        {
            type: "list",
            name: "employeeTypePicker",
            message: "Which type of worker would you like to add next?",
            choices: [
                "Engineer",
                "Intern",
                "Normal Employee",
                "I don't want to add anymore employees, set me free!"
            ]
        },
        
    ])
}
function internPrompt(){

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
            name: "github",
            message: "What is this engineer's github name?"
        },
        {
            type: "list",
            name: "employeeTypePicker",
            message: "Which type of worker would you like to add next?",
            choices: [
                "Engineer",
                "Intern",
                "Normal Employee",
                "I don't want to add anymore employees, set me free!"
            ]
        },
        
    ])
}

