const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return user;
};

const getUserId = async (token) => {
  const secret = process.env.JWT_SECRET || 'seusecretdetoken';
  const decoded = jwt.verify(token, secret);
  return decoded.data.userId;
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
  getAll,
  getById,
  getUserId,
  getByEmail,
  createUser,
};
