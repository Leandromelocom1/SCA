// backend/models/Driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnh: { type: String, required: true },
  validadeCnh: { type: Date, required: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Driver', driverSchema);
