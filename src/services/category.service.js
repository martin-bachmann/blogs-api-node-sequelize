const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createCategory = async (category) => {
  const newCategory = await Category.create({ ...category });
  return newCategory.dataValues;
};

module.exports = {
  getAll,
  createCategory,
};
