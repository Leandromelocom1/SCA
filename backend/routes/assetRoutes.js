const express = require('express');
const router = express.Router();
const {
  getAssets,
  getAvailableAssets,
  createAsset,
  getAssetDetails
} = require('../controllers/assetController');

router.get('/', getAssets);
router.get('/available', getAvailableAssets);
router.post('/', createAsset);
router.get('/details', getAssetDetails);

module.exports = router;
