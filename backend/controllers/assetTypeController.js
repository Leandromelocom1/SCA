const AssetType = require('../models/AssetType');

exports.getAssetTypes = async (req, res) => {
  try {
    const assetTypes = await AssetType.find();
    res.json(assetTypes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os tipos de ativos' });
  }
};

exports.createAssetType = async (req, res) => {
  const { name } = req.body;
  try {
    const newAssetType = new AssetType({ name });
    await newAssetType.save();
    res.status(201).json(newAssetType);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o tipo de ativo' });
  }
};
