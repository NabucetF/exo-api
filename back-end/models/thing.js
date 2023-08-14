const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  inStock: { type: Boolean },
});

module.exports = mongoose.model('Thing', thingSchema);