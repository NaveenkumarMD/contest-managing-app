const mongoose=require('mongoose')
const express=require('express')
const router1=express.Router()
const details=mongoose.model('details')
const users=mongoose.model('users')
const middleware = require('../middlewares/authmiddle')
router1.get('/mycontests',middleware,(req,res)=>{
    var name=""
    users.findOne(req.users._id).then(data=>{
        console.log(data)
        name=data.name
        console.log(name)
    })
    console.log("Output....")
    details.find({"postedby":req.users._id}).populate("postedby").then(data=>{
        console.log(data)
        res.json({data,name})
    })
})
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiMGI0NTQ1MmY4YzE0NWM2NDQxMzUiLCJpYXQiOjE2MDYwOTQwMjR9.lmolTu2i9zhgtSXIA17y35pa8mXdY2JzZeYb1J-1haU
router1.post('/details',middleware,(req,res)=>{
    console.log("Details router is running .....")
    const {number,college,contestname,membercount}=req.body
    if(!number || !college || !contestname || !membercount){
            res.json({"err":"Enter all the fields"})
    }
    console.log(req.users._id)
    details.findOne({"postedby":req.users.id,"contestname":contestname}).then(saveddata=>{
        if(saveddata){
            res.json({"err":"Already present"})
        }
        else{
            const details1=new details({
                number:number,
                college:college,
                contestname:contestname,
                membercount:membercount,
                postedby:req.users._id
            })
            details1.save().then(()=>{
                res.json({"message":"saved successfully"})
            }).catch(err=>{
                console.log("you got an error while saving to the database....")
            })
        }
    })
    
})

module.exports=router1