const mongoose = require('mongoose');
const Validate = new mongoose.Schema({
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
});
Validate.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await mongoose.model('Ressource').deleteMany({ tache: doc._id });
  }
});

module.exports = mongoose.model('Tache', Validate);