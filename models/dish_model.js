const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: String,
  origin: String,
  spiceLevel: String, // custom field
});

module.exports = mongoose.model('Dish', dishSchema);