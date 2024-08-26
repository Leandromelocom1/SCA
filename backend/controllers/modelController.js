const Model = require('../models/Model');

exports.createModel = async (req, res) => {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar o modelo' });
  }
};

exports.getModels = async (req, res) => {
  try {
    const models = await Model.find({});
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os modelos' });
  }
};
