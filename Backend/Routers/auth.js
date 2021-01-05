const express=require('express')
const router=express.Router()
const cors=require('cors')
const mongoose=require('mongoose')
const users=mongoose.model('users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {secret}=require('../keys/keys')
const middleware = require('../middlewares/authmiddle')

router.get('/protected',middleware,(req,res)=>{
    console.log("accessing protected")
})
router.post('/signup',cors,(req,res)=>{
    console.log("Signup page is running....")
    const {name,mail,password}=req.body
    if(!mail || !password){
        return res.status(402).json({"err":"Email or Password is not present"})
    }
    users.findOne({mail:mail}).then(saveduser=>{
        if(saveduser){
            console.log(" Sorry already present")
            return res.status(208).json({"err":"Already present"})
        }
        else{
            
            bcrypt.hash(password,12).then(hashedpassword=>{
                const newuser=new users({
                    name,
                    mail,
                    password:hashedpassword
                })
                newuser.save().then(()=>{
                    console.log("users details are stored...")
                    res.json({"message":"user details saved .."})
                }).catch(err=>{
                    console.log('An error occured while saving to the database'+err)
                })
            })
            
        }
        
    })

    
})

router.post('/login',(req,res)=>{
    console.log("login page is running....")
    const {mail,password}=req.body
    console.log(mail,password)
    if(!mail || !password){
        console.log("check all the fields")
        return res.status(208).json({"err":"Check all the fields"})
    }
    users.findOne({mail:mail}).then(saveduser=>{
        if(saveduser){
            bcrypt.compare(password,saveduser.password).then(match=>{
                if(match){
                    console.log("Login success ......")
                    const token=jwt.sign({_id:saveduser._id},secret)
                    console.log(`Your token is ${token}`)
                    const {_id,name,mail,password}=saveduser
                    res.json({"token":token,"user":{_id,name,mail,password}})
                }
                else{
                    console.log("password is incorrect")
                    return res.status(401).json({"pass_error":"your password is incoorect"})
                }
            })
        }
        else{
            console.log("incorrect mail id")
            return res.json({"mail_error":"Enter the correct email"})
        }
    })
    
})
module.exports=router