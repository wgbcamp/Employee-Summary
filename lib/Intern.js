const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }

    nie(){
        super.getName();
        super.getId();
        super.getEmail(); 
    }

    getSchool(){
        return this.school;
    }
    getRole(){
        return "\Intern";
    }
}

module.exports = Intern;