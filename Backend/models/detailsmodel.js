const mongoose=require('mongoose')
const  {ObjectId}=mongoose.Schema.Types
const detailsSchema=new mongoose.Schema({
    
    number:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    contestname:{
        type:String
    },
    membercount:{
        type:Number,
        required:true
    },
    postedby:{
        type:ObjectId,
        ref:"users"
    }

})
mongoose.model("details",detailsSchema)
