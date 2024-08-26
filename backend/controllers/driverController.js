// backend/controllers/driverController.js
const Driver = require('../models/Driver');

const createDriver = async (req, res) => {
  const { nome, cnh, validadeCnh, dataNascimento, endereco, telefone, email } = req.body;
  try {
    const newDriver = new Driver({ nome, cnh, validadeCnh, dataNascimento, endereco, telefone, email });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar o motorista' });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os motoristas' });
  }
};

module.exports = {
  createDriver,
  getDrivers,
};
