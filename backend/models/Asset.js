const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  marca: String,
  modelo: String,
  ano: String,
  dataCompra: Date,
  atribuidoA: String,
  departamento: String,
  dataAtribuicao: Date,
  cronogramaManutencao: String,
  metricasUso: String,
  condicao: String,
  metodoDepreciacao: String,
  detalhesIncidente: String,
  detalhesDescarte: String,
  detalhesAuditoria: String,
  detalhesGarantia: String,
  detalhesSeguro: String,
  detalhesTransferencia: String,
  consumoCombustivel: String,
  detalhesConformidade: String,
  detalhesCicloVida: String,
  detalhesAvaliacao: String,
  feedback: String,
  inventarioPecasReposicao: String,
  controleKm: Number,
  trocaOleo: Date,
  trocaPecas: Date,
  trocaPneu: Date,
  manutencaoPreventiva: Date,
  fleet: {
    consumoCombustivel: Number,
    kmSaida: Number,
    kmEntrada: Number,
    trocaOleoKm: Number,
    solicitacoesPecas: [{
      descricao: String,
      data: { type: Date, default: Date.now }
    }],
    saidas: [{
      dataSaida: Date,
      kmAtual: Number,
      motorista: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
      avarias: String
    }],
    entradas: [{
      dataEntrada: Date,
      kmAtual: Number,
      avarias: String
    }],
    emUso: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('Asset', assetSchema);
