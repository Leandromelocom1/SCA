const Steel = require('../models/Steel');

exports.createSteelEntry = async (req, res) => {
  const { date, razaoSocial, codigoProduto, descricaoProduto, pesoBruto, etiquetas } = req.body;
  try {
    const newEntry = new Steel({ date, razaoSocial, codigoProduto, descricaoProduto, pesoBruto, etiquetas });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Erro ao registrar a entrada:', error);
    res.status(500).json({ error: 'Erro ao registrar a entrada' });
  }
};

exports.createSteelExit = async (req, res) => {
  const { date, corrida, feixe, peso } = req.body;
  try {
    const existingExit = await Steel.findOne({ corrida, type: 'exit' });
    if (existingExit) {
      return res.status(400).json({ error: 'Saída já registrada para esta corrida.' });
    }
    const newExit = new Steel({ date, corrida, feixe, peso, type: 'exit' });
    await newExit.save();
    res.json(newExit);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar saída de aço' });
  }
};

exports.getSteelReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const reportData = await Steel.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o relatório de aço' });
  }
};

exports.getSteelEntryByCorrida = async (req, res) => {
  const { corrida } = req.params;
  try {
    const entry = await Steel.findOne({ corrida, type: 'entry' });
    if (!entry) {
      return res.status(404).json({ error: 'Entrada não encontrada' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a entrada' });
  }
};
