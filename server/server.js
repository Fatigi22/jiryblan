const express =require("express")
const app =express()
const mongooose=require('mongoose')
const cors=require('cors')
app.use(express.json())
app.use(cors())
mongooose.connect("mongodb://localhost:27017/juryBlan").then(()=>{
    console.log("data connection pour base donner ")
}).catch(()=>{
    console.log("ne pas connection")
})
app.listen(5000,()=>{
    console.log("server is runing ")
})