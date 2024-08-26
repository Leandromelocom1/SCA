const express = require('express');
const router = express.Router();
const steelController = require('../controllers/steelController');

router.post('/steel-entry', steelController.createSteelEntry);
router.post('/steel-exit', steelController.createSteelExit);
router.get('/steel-report', steelController.getSteelReport);
router.get('/steel-entry/:corrida', steelController.getSteelEntryByCorrida);

module.exports = router;
