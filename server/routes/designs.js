const express = require('express');
const router = express.Router();
const Design = require('../models/Design');

router.get('/', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const design = new Design({
    name: req.body.name,
    containers: req.body.containers,
    slabDimensions: req.body.slabDimensions
  });
  
  try {
    const newDesign = await design.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    if (req.body.name) design.name = req.body.name;
    if (req.body.containers) design.containers = req.body.containers;
    if (req.body.slabDimensions) design.slabDimensions = req.body.slabDimensions;
    
    const updatedDesign = await design.save();
    res.json(updatedDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    await design.deleteOne();
    res.json({ message: 'Design deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
