require('dotenv/config');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
