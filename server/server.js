const express =require("express")
const app =express()
const mongooose=require('mongoose')
const Project=require('./router/Project') 
const Taches=require("./router/Taches")
const Resource=require("./router/Ressource")

const cors=require('cors')
app.use(express.json())
app.use(cors())
app.use("/project",Project)
app.use("/Taches",Taches)
app.use("/Ressource",Resource)
mongooose.connect("mongodb://localhost:27017/juryBlan").then(()=>{
    console.log("data connection pour base donner ")
}).catch(()=>{
    console.log("ne pas connection")
})
app.listen(5000,()=>{
    console.log("server is runing ")
})