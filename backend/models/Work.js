const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
  client: { type: String, required: true },
  workAddress: { type: String, required: true },
  workPeriod: { type: String, required: true }
});

module.exports = mongoose.model('Work', workSchema);
