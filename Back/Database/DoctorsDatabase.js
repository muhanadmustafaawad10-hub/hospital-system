const mongoose = require("mongoose")
const Sckema = mongoose.Schema

const newSckema = new Sckema({
    name: String,
    spec: String,
    phone:Number,
    scedule: String,
    status:Boolean,
})

const DoctorsModel = mongoose.model("Doctors", newSckema)
module.exports=DoctorsModel