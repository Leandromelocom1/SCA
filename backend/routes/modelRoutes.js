const express = require('express');
const router = express.Router();
const { getModels, createModel } = require('../controllers/modelController');

router.get('/', getModels);
router.post('/', createModel);

module.exports = router;
