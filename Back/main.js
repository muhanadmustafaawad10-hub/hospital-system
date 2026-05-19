const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
app.use(cors())
app.use(express.json())
const DoctorsRouter = require("./Routers/DoctorsRouter")
const PatientsRouter = require("./Routers/PatientsRouter")
const AppointRouter = require("./Routers/AppointsRouter")
const registerRouter=require("./Routers/RegisterRouter")
app.listen(4000, () => {
    console.log("yes ilistend in 4000");
})

mongoose.connect("mongodb+srv://mohanad:mohanad123123@cluster0.yc8k8k7.mongodb.net/?appName=Cluster0").then((res) => {
    console.log("connected Successfully");

}).catch(console.error("error"))


app.use("/Doctors", DoctorsRouter)
app.use("/Patients", PatientsRouter)
app.use("/Appointments", AppointRouter)
app.use("/Form", registerRouter)
