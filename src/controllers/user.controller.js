const generateToken = require('../auth/generateToken');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const { body } = req;

  const checkUser = await userService.getByEmail(body.email);
  if (checkUser) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUser = userService.createUser(body);

  const token = generateToken(newUser.id);

  res.status(201).json({ token });
};

module.exports = {
  createUser,
};
