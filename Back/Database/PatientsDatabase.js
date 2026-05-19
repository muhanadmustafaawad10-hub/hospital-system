const mongoose = require("mongoose")
const Schema = mongoose.Schema
const newSckema = new Schema({
    name: String,
    age: Number,
    disease: String,
    phone:Number
})
const PatientsModel = mongoose.model("Patients", newSckema)

module.exports=PatientsModel