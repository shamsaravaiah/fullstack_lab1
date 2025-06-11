const express = require('express');
const router = express.Router();
const Dish = require('/models/dish_model');

// GET all dishes
router.get('/', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// GET dish by name
router.get('/:name', async (req, res) => {
  const dish = await Dish.findOne({ name: req.params.name });
  dish ? res.json(dish) : res.status(404).send('Dish not found');
});

// POST new dish
router.post('/', async (req, res) => {
  try {
    const exists = await Dish.findOne({ name: req.body.name });
    if (exists) return res.status(409).send('Dish already exists');
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT update dish
router.put('/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    dish ? res.json(dish) : res.status(404).send('Dish not found');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE dish
router.delete('/:id', async (req, res) => {
  const dish = await Dish.findByIdAndDelete(req.params.id);
  dish ? res.send('Dish deleted') : res.status(404).send('Dish not found');
});

module.exports = router;
