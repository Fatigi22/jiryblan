const express = require('express');
const route = express.Router();
const Tache = require('../model/Taches');
const Resource = require('../model/resource');

// Ajouter une ressource à une tâche
route.post('/tache/:IdTask/ressources', async (req, res) => {
  try {
    const { nom, type, quantite } = req.body;
    const taskId = req.params.IdTask;
    const tache = await Tache.findById(IdTask);

    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    const ressource = new Resource({
      nom,
      quantite,
      type,
      tache: taskId,
    });

    await ressource.save();
    res.status(201).json(ressource);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la ressource :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la ressource.' });
  }
});

// Obtenir toutes les ressources d'une tâche
route.get('/tache/:IdTask/ressources', async (req, res) => {
  try {
    const taskId = req.params.IdTask;
    const resources = await Resource.find({ tache: taskId }); // Correction : utiliser "tache" au lieu de "tacheId"

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des ressources', error });
  }
});


route.put('/ressources/:id', async (req, res) => {
  try {
    const { nom, type, quantite } = req.body;
    const resourceId = req.params.id;

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      { nom, type, quantite },
      { new: true }
    );

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la ressource', error });
  }
});

// Supprimer une ressource
route.delete('/:taskId/ressources/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;

    const deletedResource = await Resource.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Ressource non trouvée.' });
    }

    res.status(200).json({ message: 'Ressource supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer une tâche et ses ressources associées
route.delete('/:projectId/taches/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Tache.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    await Resource.deleteMany({ tache: taskId });

    res.status(200).json({ message: 'Tâche et ressources associées supprimées avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = route;