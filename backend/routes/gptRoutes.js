// routes/gptRoutes.js
const express = require('express');
const router = express.Router();
const { getSolution } = require('../controllers/gptController');

router.post('/gpt-query', getSolution);

module.exports = router;
