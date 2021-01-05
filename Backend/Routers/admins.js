const router2=require('express').Router()
const mongoose = require('mongoose')
const Admin=mongoose.model("Admin")
const details=mongoose.model("details")
const users=mongoose.model("users")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { secret } = require('../keys/keys')
const adminmiddleware = require('../middlewares/adminmiddle')

router2.post('/getall',adminmiddleware,(req,res)=>{
    console.log("Admins site ....")
    const {contestname}=req.body
    details.find({contestname}).populate("postedby").then(data=>{
        res.json(data)
        console.log(data)
    })

})
router2.get('/contestresults',(req,res)=>{
    console.log("Adminresult is running")
    details.find().populate("postedby").then(data=>{
        res.json(data)
        console.log("data sent.......")
        console.log(data)
    })
})
router2.post('/adminlogin',(req,res)=>{
    const {mail,password}=req.body
    Admin.findOne({mail:mail}).then(saveduser=>{
        if(saveduser){
            console.log("Admin present")
            bcrypt.compare(password,saveduser.password).then(match=>{
                if(match){
                    const admintoken=jwt.sign({_id:saveduser.id},secret)
                    console.log("admin token is  "+admintoken)
                    saveduser.password="*******"
                    res.json({saveduser,admintoken})
                }
                else{
                    res.json({"err":"check your password admin or ask MD"})
                }
            })
            
        }
        else{
            res.json({"mail_err":"Everyone cant be the decision maker"})
        }
    })

})
module.exports=router2