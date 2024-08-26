const express = require('express');
const router = express.Router();
const {
  getAssetTypes,
  createAssetType
} = require('../controllers/assetTypeController');

router.get('/', getAssetTypes);
router.post('/', createAssetType);

module.exports = router;
