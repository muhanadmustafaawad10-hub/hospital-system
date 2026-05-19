const express = require("express")
const router = express.Router()
const DoctorDataBase=require("../Database/DoctorsDatabase")
router.post("/", async(req, res) => {
    const DoctorBase=new DoctorDataBase()
     console.log(req.body);
     DoctorBase.name=req.body.data.Name
     DoctorBase.spec=req.body.data.Specialty
     DoctorBase.phone = req.body.data.Phone
    DoctorBase.scedule = req.body.data.Scedule
    DoctorBase.status=false
    await DoctorBase.save()
    res.send(DoctorBase)
})
 
router.get("/",async (req, res) => {
    const allData = await DoctorDataBase.find()
    res.send(allData)
    
})

router.delete("/",async (req, res) => {
    const id = req.query.id
    const deletedValue =await DoctorDataBase.findByIdAndDelete(id)
    res.send(deletedValue)
})

router.put("/",async (req, res) => {
    const id = req.query.id
    const data=req.body.data
    const UpdatedElement =await DoctorDataBase.findByIdAndUpdate(id, {
        name: data.Name,
    spec: data.Specialty,
    phone:data.Phone,
    scedule: data.Scedule,
  
    }, { new: true })
    res.send(UpdatedElement)

})


router.put("/status", async(req, res) => {
    const data = req.body.data
    for (const ele of data) {
        const id = ele._id
        await DoctorDataBase.findByIdAndUpdate(id,{status:ele.status},{new:true})
    }
    res.send("Success process")
})


router.get("/Edit",async (req, res) => {
    const id = req.query.id
    const element =await DoctorDataBase.findById(id)
    res.send(element)
})


router.get("/Search",async (req, res) => {
    const value = req.query.q
    const alldata = await DoctorDataBase.find()
    const filterd = alldata.filter((ele) => ele.name.startsWith(value))
    res.send(filterd)
})

router.get("/:id",async (req,res)=> {
    const id = req.params.id
    const element = await DoctorDataBase.findById(id)
    res.send(element)
})


module.exports=router