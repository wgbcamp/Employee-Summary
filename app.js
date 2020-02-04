var inquirer = require("inquirer");
var fs = require('fs');
var createHTML = require("create-html");
const cheerio = require('cheerio');
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
var id = 0;



managerPrompt();

//first prompt that creates the html file and makes manager card
function managerPrompt(){
   
  

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of the manager of this team?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the email address of this manager?"
    },
    {
        type: "input",
        name: "special",
        message: "What is this manager's office number?"
    },
    {
        type: "list",
        name: "picktype",
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

        createManagerCardNewQuestion(response);

    })

}



//engineer prompt
function engineerPrompt(){



    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of this engineer?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the email address of this engineer?"
        },
        {
            type: "input",
            name: "special",
            message: "What is this engineer's github name?"
        },
        {
            type: "list",
            name: "picktype",
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
        const workerObject = new Engineer(response.name, id, response.email, response.special); 
        var specialPrepend = 'Github username: ';
        otherEmployees(response, workerObject, specialPrepend);





    })







    
}

//internPrompt
function internPrompt(){

  

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of this intern?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the email address of this intern?"
        },
        {
            type: "input",
            name: "special",
            message: "What school is this intern attending?"
        },
        {
            type: "list",
            name: "picktype",
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

        const workerObject = new Intern(response.name, id, response.email, response.special); 
        var specialPrepend = 'School: ';
        otherEmployees(response, workerObject, specialPrepend);

    })
}












//normal employee prompt
function normalEmployeePrompt(){

    

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of this employee?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the email address of this employee?"
        },
        {
            type: "list",
            name: "picktype",
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

        const workerObject = new Employee(response.name, id, response.email); 
        var specialPrepend = '';
        otherEmployees(response, workerObject, specialPrepend);
    })
}







//read and write the updates
function readAndWrite(newWorker){

    //reads html document
    fs.readFile('output/team.html', "utf8", function(error, data){

        if (error) {
            return console.log(error);
        }

        //stores file data in variable
        const $ = cheerio.load(data);

        //stores html document in variable
        const entireDocument = $('html');

        //hooks into workerAdder to add a worker
        $('#workerAdder').append(newWorker);

        //writes changes to html file
        fs.writeFile('output/team.html', entireDocument, (err) =>{
            if (err) throw err;
        })
    })
}



//creates a Manager card and a new question, then updates html file
function createManagerCardNewQuestion(response){

    if(response.picktype == "Engineer"){
        engineerPrompt();
    }else if (response.picktype == "Intern"){
        internPrompt();
    }else if (response.picktype == "Normal Employee"){
        normalEmployeePrompt();
    }

const workerObject = new Manager(response.name, id, response.email, response.special); 
var newName = workerObject.getName();
var newId = workerObject.getId();
var newEmail = workerObject.getEmail();
var newSpecial = workerObject.getSpecial();
var newRole = workerObject.getRole();

var html = createHTML({
    title: 'My Team',
    script: 'app.js',
    css: ['https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css','../templates/style.css'],
    head: '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>',
    body: `
             <h1 id="header">My Team!</h1>
                 
    <div id="cardHolder">          
        <div class="columns is-multiline" id="workerAdder">
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
                        <p>Office number: ${newSpecial}</p>
                        <br>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
             `
});



fs.writeFile('output/team.html', html, function (err){
    if (err) console.log(err)
});

id++;
}




//creates cards for other employees
function otherEmployees(response, workerObject, specialPrepend){

if(response.picktype == "Engineer"){
    engineerPrompt();
}else if (response.picktype == "Intern"){
    internPrompt();
}else if (response.picktype == "Normal Employee"){
    normalEmployeePrompt();
}


        var newName = workerObject.getName();
        var newId = workerObject.getId();
        var newEmail = workerObject.getEmail();

        if(Object.keys(workerObject).length < 4){
            var newSpecial = "";
        }else{
            var newSpecial = workerObject.getSpecial();
        }
        
        var newRole = workerObject.getRole();



var newWorker = `<div class="column is-one-third">
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
        <p>${specialPrepend}${newSpecial}</p>
        <br>
         </div>
    </div>
</div>
</div>`

readAndWrite(newWorker);
id++;
}