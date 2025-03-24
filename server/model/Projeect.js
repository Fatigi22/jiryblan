const { default: mongoose } = require('mongoose')
const mongooose=require('mongoose')
const data =new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    budget: { type: Number, required: true }
})
const Project=mongooose.model("Project",data)
module.exports=Project