// backend/controllers/departmentController.js
const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar o departamento' });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os departamentos' });
  }
};
