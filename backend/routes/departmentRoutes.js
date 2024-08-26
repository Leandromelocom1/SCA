// backend/routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Defina as rotas
router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getDepartments);

module.exports = router;
