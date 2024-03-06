const mongoose = require("mongoose")

// mongoose.connect('mongodb://127.0.0.1:27017/NCrud',()=>{
//     console.log("Db is ...Connected")
// });

mongoose.connect("mongodb://127.0.0.1:27017/CRUDN")
.then(()=>{
console.log("Database is Connected Sucessfully")
})
.catch((err)=>{
    console.log("Not Connect",err)
})