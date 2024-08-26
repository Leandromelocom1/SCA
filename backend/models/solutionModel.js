const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  problemDescription: { type: String, required: true },
  solutionDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
