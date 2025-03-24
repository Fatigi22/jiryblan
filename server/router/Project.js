const express =require('express')
const router=express.Router()
const Project=require('../model/Projeect')
router.get("/AfficherProjct",async(req,res)=>{
    try{
        const datad=await Project.find()
        res.send(datad)
    }catch(erre){
res.send("ne pas afficher data ")
    }
 
})
router.post("/AjouterProject",async(res,req)=>{
    try{
        const data=new  Project(
       {
           nom: req.body.nom,
           description: req.body.description,
           dateDebut: req.body.dateDebut,
           dateFin: req.body.dateFin,
         budget: req.body.budget,
        }
)
await data.save()
    }catch(err){
res.send("data is not insertion")
    }

})
router.put("/modifier/:id",(res,req)=>{
const {id}=req.params.id
Project.updateOne({_id:id},{
    nom: req.body.nom,
      description: req.body.description,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      budget: req.body.budget
}).then(()=>{
    console.log("data is modifier")
    res.send("data is modifier ")
}).catch(()=>{
    console.log("data is note modifier ")
    res.send("data is not modifier ")
})
})
router.delete("/:id",(res,req)=>{
const id=req.params.id
new Project.deleteMany({_id:id}).then(()=>{
    console.log("data is delete ")
    res.send("data is delete")
}).catch(()=>{
    console.log("data is not delete ")
    res.send("data is delete")
})
})