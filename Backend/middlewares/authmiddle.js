const jwt=require('jsonwebtoken')
const {secret}=require('../keys/keys')
const mongoose=require('mongoose')
const users=mongoose.model('users')
const middleware=(req,res,next)=>{
    const {authorization}=req.headers
    console.log(authorization)
    if(!authorization){
        console.log("cant able to find token")
        return res.status(401).json({"err":"please login again"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,secret,(err,payload)=>{
        if(err){
            return res.status(401).json({"err":"authorization failed"})
        }
        const {_id}=payload
        users.findById(_id).then(data=>{
            req.users=data
            console.log(data)
            next()
        })
    })
}
module.exports=middleware