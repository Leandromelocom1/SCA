const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do equipamento é obrigatório.'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
