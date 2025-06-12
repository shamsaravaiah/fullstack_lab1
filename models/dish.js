const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: Number,
  origin: String,
  spiceLevel: String // Custom field
});

module.exports = mongoose.model('Dish', dishSchema);