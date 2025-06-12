const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: String,
  origin: String,
  spiceLevel: String
});

module.exports = mongoose.model('Dish', dishSchema);
