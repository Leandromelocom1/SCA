const express = require('express');
const router = express.Router();
const { uploadManual } = require('../controllers/manualController');

router.post('/upload-manual', uploadManual);

module.exports = router;
