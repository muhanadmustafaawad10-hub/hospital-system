const mongoose = require("mongoose")
const Sckema = mongoose.Schema
const newSckema = new Sckema({
    patient: String,
    doctor:String,
    date:String,
    time:String
})

const Appointmodel = mongoose.model("Appointments", newSckema)
module.exports=Appointmodel