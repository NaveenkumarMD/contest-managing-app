const jwt=require('jsonwebtoken')
const {secret}=require('../keys/keys')
const mongoose=require('mongoose')
const Admin=mongoose.model('Admin')
const middleware=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({"err":"please login again admin"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,secret,(err,payload)=>{
        if(err){
            return res.status(401).json({"err":"authorization failed"})
        }
        const {_id}=payload
        console.log(_id)
        Admin.findById(_id).then(data=>{
            req.Admin=data
            
            next()
        })
    })
}
module.exports=middleware