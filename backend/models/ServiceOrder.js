const mongoose = require('mongoose');

const serviceOrderSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ['Alta', 'Média', 'Baixa'], // Define os valores válidos para prioridade
  },
  status: {
    type: String,
    default: 'Aberta',
    enum: ['Aberta', 'Em andamento', 'Concluída', 'Fechada'], // Adicione 'Fechada' aqui
  },
  attendant: String,
  attendDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceOrder = mongoose.model('ServiceOrder', serviceOrderSchema);

module.exports = ServiceOrder;
