// backend/models/Steel.js
const mongoose = require('mongoose');

const steelSchema = new mongoose.Schema({
  date: Date,
  razaoSocial: String,
  codigoProduto: String,
  descricaoProduto: String,
  pesoBruto: String,
  etiquetas: [{
    corrida: String,
    feixe: String,
    peso: String
  }]
});

module.exports = mongoose.models.Steel || mongoose.model('Steel', steelSchema);
