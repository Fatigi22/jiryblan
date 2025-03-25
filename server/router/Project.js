const express = require('express');
const router = express.Router();
const Project = require('../model/Projeect'); 
const Tache = require("../model/Taches");
const Ressource = require("../model/resource");
router.get("/AfficherProjct", async (req, res) => {
    try {
        const data = await Project.find();
        res.status(200).json(data); // Better to use status codes and json()
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des projets" });
    }
});

// Add new project
router.post("/AjouterProject", async (req, res) => { // Fixed parameter order (req, res)
    try {
        const data = new Project({
            nom: req.body.nom,
            description: req.body.description,
            dateDebut: req.body.dateDebut,
            dateFin: req.body.dateFin,
            budget: req.body.budget,
        });
        
        await data.save();
        res.status(201).json({ message: "Projet ajouté avec succès", data }); // 201 for created
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Erreur lors de l'ajout du projet" }); // 400 for bad request
    }
});

// Update project
router.put("/:id", async (req, res) => { // Made async for consistency
    try {
        const { id } = req.params; // Fixed destructuring
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                nom: req.body.nom,
                description: req.body.description,
                dateDebut: req.body.dateDebut,
                dateFin: req.body.dateFin,
                budget: req.body.budget
            },
            { new: true } // Returns the updated document
        );
        
        if (!updatedProject) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        
        res.status(200).json({ message: "Projet modifié avec succès", updatedProject });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Erreur lors de la modification du projet" });
    }
});

router.delete("/Supprimer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await Projet.findByIdAndDelete(id);
  
      if (!deletedProject) {
        return res.status(404).json({ message: 'Projet non trouvé.' });
      }
  
      const deletedTasks = await Tache.find({ projet: id });
      const taskIds = deletedTasks.map(task => task._id);
  
      await Tache.deleteMany({ projet: id });
      await Ressource.deleteMany({ tache: { $in: taskIds } });
  
      res.status(200).json({ message: "Projet, ses tâches et ressources supprimés avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;