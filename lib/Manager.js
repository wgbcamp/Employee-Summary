const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
     }

     nie(){
        super.getName();
        super.getId();
        super.getEmail(); 
    }

    getOfficeNumber(){
        return this.officeNumber;
      
    }
    getRole(){
        return "\Manager";
    }
}



module.exports = Manager;