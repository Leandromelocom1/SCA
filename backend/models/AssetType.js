// backend/models/AssetType.js
const mongoose = require('mongoose');

const assetTypeSchema = new mongoose.Schema({
  typeName: { type: String, unique: true, required: true }
});

const AssetType = mongoose.model('AssetType', assetTypeSchema);

module.exports = AssetType;
