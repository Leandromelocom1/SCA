// backend/routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Defina as rotas
router.post('/', brandController.createBrand);
router.get('/', brandController.getBrands);

module.exports = router;
