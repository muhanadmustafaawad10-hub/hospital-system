const express = require("express")
const router = express.Router()
const PatientDataModel=require("../Database/PatientsDatabase")
router.post("/",async (req, res) => {
    const newPatient = new PatientDataModel()
    newPatient.name=req.body.data.Name
    newPatient.age=req.body.data.Age
    newPatient.disease=req.body.data.Disease
    newPatient.phone = req.body.data.Phone
    await newPatient.save()
    res.send(newPatient)
})

router.get("/",async (req, res) => {
    const allData = await PatientDataModel.find()
    res.send(allData)
})

router.delete("/",async (req, res) => {
    const id = req.query.id
    const deletedValue = await PatientDataModel.findByIdAndDelete(id)
    res.send(deletedValue)
})

router.put("/", async (req, res) => {
    const id = req.query.id
    const data = req.body.data
    const UpdatedElement =await PatientDataModel.findByIdAndUpdate(id, {
           name: data.Name,
    age: data.Age,
    disease: data.Disease,
    phone:data.Phone
    }, { new: true })
    res.send(UpdatedElement)
})


router.get("/Edit",async (req, res) => {
    const id = req.query.id
    const element =await PatientDataModel.findById(id)
    res.send(element)
})



router.get("/Search",async (req, res) => {
    const value = req.query.q
    const alldata =await PatientDataModel.find()
    const filterd = alldata.filter((ele) => ele.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
    res.send(filterd)


})



router.get("/:id",async (req, res) => {
    const id = req.params.id
    const element =await PatientDataModel.findById(id)
    res.send(element)
})

module.exports=router