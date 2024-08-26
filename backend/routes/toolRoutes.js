const express = require('express');
const router = express.Router();
const {
  getTools,
  createTool,
  getAvailableTools,
  getWithdrawnTools,
  getDefectiveTools,
  updateToolStatus,
  repairTool,
  sendPurchaseRequest // Importando a nova função
} = require('../controllers/toolController');

router.get('/', getTools);
router.get('/available', getAvailableTools);
router.get('/withdrawn', getWithdrawnTools);
router.get('/defective', getDefectiveTools); // Rota para buscar ferramentas com defeito
router.post('/', createTool);
router.patch('/:id/status', updateToolStatus);
router.patch('/:id/repair', repairTool); // Rota para reparar uma ferramenta
router.post('/send-purchase-request', sendPurchaseRequest); // Rota para enviar solicitação de compra

module.exports = router;
