const express = require("express")
const router = express.Router()
const bcrypt=require("bcrypt")
const RegisterDatabase = require("../Database/RegisterDatabase")

router.post("/Register", async (req, res) => {
const {name,email,mobile,adress,password}=req.body.data
    const allData =await RegisterDatabase.find()
    const status=allData.some((i)=>i.email===email)
    if (status) {
    res.send("Unable to create account. This email is already registered")
    }
    
    else {
        const newRegister = new RegisterDatabase()
        newRegister.name = name
        newRegister.email = email
        newRegister.mobile=mobile
        newRegister.adress=adress
        newRegister.password = await bcrypt.hash(password, 10)
        await newRegister.save()
        res.send({msg:"successfully registed",name:name})

        
}

})

router.post("/Login",async (req, res) => {
    const { name, email, password } = req.body.data
    
    const allData = await RegisterDatabase.find()
    const status = allData.find((i) => i.email === email)
    if (status) {
        const passwordStatus = await bcrypt.compare(password, status.password)
        if (passwordStatus) {
            res.send({msg:"successfully login",name:name})
        } else {
        res.send("Login failed. Please check your Email and password")
            
        }
    }
    else {
        res.send("Login failed. Please check your Email and password")
    }

})

module.exports=router