const express = require('express');
const { createDriver, getDrivers } = require('../controllers/driverController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

// Corrija as chamadas das rotas, garantindo que o segundo argumento seja uma função e não um objeto.
router.post('/', authenticateJWT, createDriver);
router.get('/', authenticateJWT, getDrivers);

module.exports = router;
