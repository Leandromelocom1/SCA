const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Certifique-se de usar a mesma chave secreta

// Função para obter usuários
const getUsers = async (req, res) => {
  const users = await User.find({}, 'username permissions');
  res.json(users);
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  const { permissions } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { permissions }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Função para criar um novo usuário
const createUser = async (req, res) => {
  const { username, password, permissions } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, permissions });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

module.exports = { getUsers, updateUser, createUser };
