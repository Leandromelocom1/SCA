// backend/controllers/brandController.js
const Brand = require('../models/Brand');

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar a marca' });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as marcas' });
  }
};
