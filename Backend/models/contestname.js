const mongoose=require('mongoose')

const detailsSchema=new mongoose.Schema({
    
    contestname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})
mongoose.model("contestname",detailsSchema)

