const mongoose = require("mongoose")

const EmployeeSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is Required"]
    },
    email:{
        type:String,
        required:[true, "email is Required"]
    },
    phone:{
        type:String,
        required:[true, "phone is Required"]
    },
    dsg:{
        type:String,
        required:[true, "dsg is Required"]
    },
    salary:{
        type:String,
        required:[true, "salary is Required"]
    }
    ,
    city:{
        type:String
    },
    state:{
        type:String  
    }
})

const Employee = new mongoose.model("Empolyee",EmployeeSchema)

module.exports = Employee