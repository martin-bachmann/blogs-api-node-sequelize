const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { body } = req;
  const newCategory = await categoryService.createCategory(body);
  return res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};
