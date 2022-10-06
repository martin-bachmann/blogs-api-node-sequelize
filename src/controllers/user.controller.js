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

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
