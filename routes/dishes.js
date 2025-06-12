const express = require('express');
const router = express.Router();
const Dish = require('../models/dish_model');

// GET all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error("❌ Error fetching dishes:", err);
    res.status(500).send('Server error');
  }
});

// POST a new dish — with logging and error message
router.post('/', async (req, res) => {
  console.log("📥 Received POST /api/dishes with body:", req.body);

  try {
    const exists = await Dish.findOne({ name: req.body.name });
    if (exists) {
      console.warn("⚠️ Dish already exists:", req.body.name);
      return res.status(409).json({ error: 'Dish with that name already exists' });
    }

    const dish = new Dish(req.body);
    const saved = await dish.save();

    console.log("✅ Dish saved to DB:", saved);
    res.status(201).json(saved);
  } catch (e) {
    console.error("❌ Error saving dish:", e.message);
    res.status(400).json({ error: 'Failed to save dish', message: e.message });
  }
});

// DELETE dish by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.warn("⚠️ Dish not found for delete:", req.params.id);
      return res.status(404).send('Dish not found');
    }
    console.log("🗑️ Deleted dish:", deleted.name);
    res.send('Dish deleted');
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(400).send('Delete failed');
  }
});

module.exports = router;
