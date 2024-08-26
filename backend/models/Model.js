// backend/models/Model.js
const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Model', modelSchema);
