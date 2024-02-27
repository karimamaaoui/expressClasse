const express = require('express');
const router = express.Router();
const Voiture = require('../models/voiture');


//-creer un api pour ajouter une voiture au tableau voiture 
router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;

        // Validate if name is null
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Create a new voiture 
        const newVoiture = new Voiture({
            name,
        });

        // Save the Voiture to the database
        await newVoiture.save();

        res.status(201).json({ message: 'Voiture registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-creer un api pour lister tous les voitues 
router.get('/list', async (req, res) => {
    try {
        // Fetch all voitures from the database
        const voitures = await Voiture.find();

        res.status(200).json(voitures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-creer un api pour lister une voiture a traveres le parametre passer et un message not found s'il existe pas dans le tableau 
router.get('/get/:id', async (req, res) => {
    try {
        const voitureId = req.params.id;

        // Fetch the voiture from the database by ID
        const voiture = await Voiture.findById(voitureId);

        if (!voiture) {
            // If voiture is not found return this msg
            return res.status(404).json({ message: 'Voiture not found' });
        }

        res.status(200).json(voiture);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-creer un api pour modifier une voiture avec un id specifique avec une verification (existe ou non )
router.put('/update/:id', async (req, res) => {
    try {
        const voitureId = req.params.id;

        // Fetch the voiture from the database by ID
        const existingVoiture = await Voiture.findById(voitureId);
        if (!existingVoiture) {
            return res.status(404).json({ message: 'Voiture not found' });
        }

        // Update the existing voiture 
        existingVoiture.name = req.body.name; 

        // Save the updated voiture to the database
        const updatedVoiture = await existingVoiture.save();

        res.status(200).json({ message: 'Voiture updated successfully', updatedVoiture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-creer un api pour supprimer une voiture avec un id specifiue avec une verification avant le supprimer 
router.delete('/delete/:id', async (req, res) => {
    try {
        const voitureId = req.params.id;

        // Fetch the voiture from the database by ID
        const existingVoiture = await Voiture.findById(voitureId);
        if (!existingVoiture) {
            return res.status(404).json({ message: 'Voiture not found' });
        }

        // Delete the existing voiture
        await existingVoiture.deleteOne({_id: voitureId});

        res.status(200).json({ message: 'Voiture deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
