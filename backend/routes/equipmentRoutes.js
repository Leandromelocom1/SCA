const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Rota para criar um novo equipamento
router.post('/create', async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o equipamento.' });
  }
});

// Rota para listar todos os equipamentos
router.get('/list', async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os equipamentos.' });
  }
});

module.exports = router;
