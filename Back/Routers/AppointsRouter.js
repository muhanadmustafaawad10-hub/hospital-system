const express = require("express")
const router = express.Router()
const AppointData=require("../Database/AppointsDatabase")
router.post("/",async (req, res) => {
    const newAppoint = new AppointData()
    newAppoint.patient=req.body.data.Patient
    newAppoint.doctor=req.body.data.Doctor
    newAppoint.date=req.body.data.Date
    newAppoint.time = req.body.data.Time
  await  newAppoint.save()
res.send(`success:${newAppoint}`)
})

router.get("/",async (req, res) => {
  const allData = await AppointData.find()
  res.send(allData)
})

router.delete("/",async (req, res) => {
    const id = req.query.id
    const deletedValue = await AppointData.findByIdAndDelete(id)
    res.send(deletedValue)
})

router.put("/",async (req, res) => {
   const data = req.body.data
    const id = req.query.id
    const updatedElement =await AppointData.findByIdAndUpdate(id, {
    patient: data.Patient,
    doctor:data.Doctor,
    date:data.Date,
    time:data.Time
    
    },{new:true})
res.send(updatedElement)
})


router.get("/Edit",async (req, res) => {
    const id = req.query.id
    const element =await AppointData.findById(id)
    res.send(element)
})


router.get("/Search",async (req, res) => {
    const value = req.query.q
    const alldata =await AppointData.find()
    const filterd = alldata.filter((ele) => ele.doctor.startsWith(value))
    res.send(filterd)


})


router.get("/:id",async (req, res) => {
  const id = req.params.id
  const element = await AppointData.findById(id)
  res.send(element)
})

module.exports=router