const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  toolName: { type: String, required: true },
  description: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  status: { type: String, default: 'Em estoque' },
  problemDescription: { type: String },
  solutionDescription: { type: String },
});

module.exports = mongoose.model('Tool', ToolSchema);
