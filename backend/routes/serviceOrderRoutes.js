const express = require('express');
const ServiceOrder = require('../models/ServiceOrder');
const router = express.Router();

// Rota para criar uma nova ordem de serviço
router.post('/create', async (req, res) => {
    try {
        const serviceOrder = new ServiceOrder(req.body);
        await serviceOrder.save();
        res.status(201).json(serviceOrder);
    } catch (error) {
        console.error('Erro ao criar a ordem de serviço:', error);
        res.status(400).json({ error: 'Erro ao criar a ordem de serviço.' });
    }
});

// Rota para listar todas as ordens de serviço ou filtrar por status e data
router.get('/list', async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        const query = {};

        // Filtrar por status, se fornecido
        if (status) {
            query.status = status;
        }

        // Filtrar por data de criação, se fornecida
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
            };
        } else if (startDate) {
            query.createdAt = {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            };
        } else if (endDate) {
            query.createdAt = {
                $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
            };
        }

        const serviceOrders = await ServiceOrder.find(query);
        res.json(serviceOrders);
    } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
        res.status(500).json({ error: error.message });
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
