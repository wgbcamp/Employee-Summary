const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, github){
       super(name, id, email);
       this.github = github;
    }
    
    nie(){
        super.getName();
        super.getId();
        super.getEmail(); 
    }
    
    getSpecial(){
        return this.github;
    }
    getRole(){
        return "\Engineer";
    }
}


module.exports = Engineer;




