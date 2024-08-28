const express = require('express');
const ServiceOrder = require('../models/ServiceOrder'); // Certifique-se de que o modelo está correto
const router = express.Router();

// Rota para criar uma nova ordem de serviço
router.post('/create', async (req, res) => {
  try {
    const serviceOrder = new ServiceOrder(req.body);
    await serviceOrder.save();
    res.status(201).json(serviceOrder);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar a ordem de serviço.' });
  }
});

// Rota para listar todas as ordens de serviço
router.get('/', async (req, res) => {
  try {
    const serviceOrders = await ServiceOrder.find();
    res.json(serviceOrders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordens de serviço.' });
  }
});

// Rota para atualizar uma ordem de serviço existente
router.patch('/update/:id', async (req, res) => {
  try {
    const { priority, equipment, status, attendant, attendDescription } = req.body;

    if (!priority || !equipment) {
      return res.status(400).json({ error: 'Priority and Equipment are required' });
    }

    const serviceOrder = await ServiceOrder.findByIdAndUpdate(
      req.params.id,
      { status, attendant, attendDescription, priority, equipment },
      { new: true, runValidators: true }
    );

    if (!serviceOrder) {
      return res.status(404).json({ error: 'Service Order not found' });
    }

    res.json(serviceOrder);
  } catch (error) {
    console.error('Erro ao atualizar a ordem de serviço:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
