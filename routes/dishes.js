const express = require('express');
const router = express.Router();
const Dish = require('../models/dish_model');
// GET all dishes
router.get('/', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// GET dish by name
router.get('/:name', async (req, res) => {
  const dish = await Dish.findOne({ name: req.params.name });
  if (!dish) return res.status(404).send('Dish not found');
  res.json(dish);
});

// POST new dishCONNECTION_URL=mongodb://localhost:27017/FULLSTACK LAB 1
router.post('/', async (req, res) => {
  try {
    const exists = await Dish.findOne({ name: req.body.name });
    if (exists) return res.status(409).send('Dish already exists');
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).send('Dish added');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// PUT update dish
router.put('/:id', async (req, res) => {
  const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send('Dish not found');
  res.send('Dish updated');
});

// DELETE dish
router.delete('/:id', async (req, res) => {
  const deleted = await Dish.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Dish not found');
  res.send('Dish deleted');
});

module.exports = router;