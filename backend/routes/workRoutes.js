const express = require('express');
const router = express.Router();
const { createWork, getWorks } = require('../controllers/workController'); // Importe as funções corretamente

router.post('/', createWork); // Defina a rota POST para criar obras
router.get('/', getWorks); // Defina a rota GET para obter obras

module.exports = router;
