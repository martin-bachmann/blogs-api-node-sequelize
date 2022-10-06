require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userId) => {
  const token = jwt.sign({ data: { userId } }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;