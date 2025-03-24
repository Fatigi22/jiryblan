const mongoose=require("mongoose")
const Taches = require("./Taches")
const { ref, required } = require("joi")
const Data=new mongoose.Schema({
    nom: { type: String, required: true },
    type : { type :String , required:true},
    quantite :{type:Number ,required:true},
    Taches:{
        type:mongoose.Types.ObjectId,
       ref:'Taches',
       required:true
    }})