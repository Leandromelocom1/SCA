// controllers/assetController.js
const Asset = require('../models/Asset');

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os ativos' });
  }
};

exports.getAvailableAssets = async (req, res) => {
  try {
    const availableAssets = await Asset.find({ 'fleet.emUso': false });
    res.json(availableAssets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os ativos disponíveis' });
  }
};

exports.createAsset = async (req, res) => {
  const asset = new Asset(req.body);
  try {
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar o ativo' });
  }
};

exports.getAssetDetails = async (req, res) => {
  try {
    const assets = await Asset.find({}).populate('fleet.saidas.motorista');
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os detalhes dos veículos' });
  }
};
