const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { categoryController } = require('../controllers');
const categoryMiddleware = require('../middlewares/category.middleware');

const router = express.Router();

router.get('/', validateJWT, categoryController.getAllCategories);

router.post('/', validateJWT, categoryMiddleware, categoryController.createCategory);

module.exports = router;
