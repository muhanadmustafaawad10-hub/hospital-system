const mongoose = require("mongoose")
const Sckema = mongoose.Schema
const newSckema = new Sckema({
    name: String,
    mobile: String,
    adress:String,
    email: String,
    password:String
})

const Registermodel = mongoose.model("register", newSckema)
module.exports=Registermodel