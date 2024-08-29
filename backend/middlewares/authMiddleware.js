const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY não definida no ambiente. Por favor, defina a chave no arquivo .env.");
}

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    } catch (err) {
      return res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
