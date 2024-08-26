const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importe o modelo de usuário
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Procure o usuário no banco de dados
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token
    res.json({ token });
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    res.status(500).json({ error: 'Erro ao autenticar o usuário' });
  }
};
