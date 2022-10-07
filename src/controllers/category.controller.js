const { categoryService } = require('../services');

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  const { body } = req;
  const newCategory = await categoryService.createCategory(body);
  return res.status(201).json(newCategory);
};

module.exports = {
  getAllCategories,
  createCategory,
};
