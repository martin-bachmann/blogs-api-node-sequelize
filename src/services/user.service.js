const { User } = require('../models');

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = async (user) => {
  const newUser = await User.create({ ...user });

  return newUser;
};

module.exports = {
  getById,
  getByEmail,
  createUser,
};
