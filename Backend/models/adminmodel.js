const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    mail:{
        type:String,
    },
    password:{
        type:String
    }
})
mongoose.model("Admin",adminSchema)
