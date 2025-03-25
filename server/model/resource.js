const mongoose=require("mongoose")
const Taches = require("./Taches")

const Data=new mongoose.Schema({
    nom: { type: String, required: true },
    type : { type :String , required:true},
    quantite :{type:Number ,required:true},
    Taches:{
        type:mongoose.Types.ObjectId,
       ref:'Taches',
       required:true
    }})
    const Rouseeurce=mongoose.model("Ressource",Data)
    module.exports=Rouseeurce