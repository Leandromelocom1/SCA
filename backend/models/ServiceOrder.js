const mongoose = require('mongoose');

// Define o esquema para a Ordem de Serviço (Service Order)
const serviceOrderSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória.'],
    trim: true, // Remove espaços em branco no início e no final da string
  },
  equipment: {
    type: String,
    required: [true, 'O equipamento é obrigatório.'],
    trim: true,
  },
  priority: {
    type: String,
    required: [true, 'A prioridade é obrigatória.'],
    enum: {
      values: ['Alta', 'Média', 'Baixa'],
      message: 'Prioridade inválida. As opções são: Alta, Média ou Baixa.',
    },
  },
  status: {
    type: String,
    default: 'Aberta',
    enum: {
      values: ['Aberta', 'Em andamento', 'Concluída', 'Pendente'], // Adicionando 'Pendente' como uma opção válida
      message: 'Status inválido. As opções são: Aberta, Em andamento, Concluída ou Pendente.',
    },
  },
  requester: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Data de abertura automática
  },
  attendant: {
    type: String,
  },
  attendDescription: {
    type: String,
  },
});

// Cria o modelo ServiceOrder a partir do esquema definido
const ServiceOrder = mongoose.model('ServiceOrder', serviceOrderSchema);

module.exports = ServiceOrder;
