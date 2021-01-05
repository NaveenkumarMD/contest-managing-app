const router3=require('express').Router()
const mongoose=require("mongoose")
const contestname=mongoose.model("contestname")

router3.post('/getcontests',(req,res)=>{
    console.log("getcontests route is running...")
    const {contest_name,contest_description}=req.body
    console.log(contest_name)
    contestname.findOne({contestname:contest_name}).then(data=>{
        if(data){
            console.log(data)
             return res.json({"err":"Already present commamder"})
        }
        const c1=new contestname({
            contestname:contest_name,
            description:contest_description
        })
        console.log(contest_name)
        console.log(contest_description)
        c1.save().then(()=>{
            res.json({"message":"success"})
        })
    })

})
router3.get('/getcontests',(req,res)=>{
    console.log("get contests get route is runnning ....")
    contestname.find().then(data=>{
        res.json(data)
    })
})
module.exports=router3