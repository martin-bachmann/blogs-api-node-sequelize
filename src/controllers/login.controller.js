const generateToken = require('../auth/generateToken');
const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.id);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
