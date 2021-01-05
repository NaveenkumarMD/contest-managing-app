const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
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
mongoose.model('users',userSchema)
