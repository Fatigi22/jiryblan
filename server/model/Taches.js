const mongooose=require('mongoose')
const data=new mongooose.Schema({
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    projet: { type: mongooose.Schema.Types.ObjectId, ref: 'Projet', required: true },
})
const Taches =mongooose.model("Taches",data)
module.exports=Taches
