const express=require('express')
const app=express()

const port=process.env.PORT || 3002
const mongoose=require('mongoose')
const {MongoURI}=require('./keys/keys')
app.use(express.json())

mongoose.connect(MongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to the mongodb database ...")
}).catch(err=>{
    console.log("you got an error"+err)
})

require('./models/users')
require('./models/detailsmodel')
require('./models/adminmodel')
require('./models/contestname')
console.log("running")

app.use(require('./Routers/auth'))
app.use(require('./Routers/details'))
app.use(require('./Routers/admins'))
app.use(require('./Routers/contestname'))

app.listen(port,()=>{
    console.log("backend is running at "+port)
})