const Work = require('../models/Work');

exports.createWork = async (req, res) => {
  const { client, workAddress, workPeriod } = req.body;
  console.log('Dados recebidos:', req.body); // Log dos dados recebidos
  try {
    const newWork = new Work({ client, workAddress, workPeriod });
    await newWork.save();
    res.status(201).json(newWork);
  } catch (error) {
    console.error('Erro ao criar a obra:', error);
    res.status(400).json({ error: 'Erro ao criar a obra' });
  }
};

exports.getWorks = async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as obras' });
  }
};
