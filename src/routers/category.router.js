const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { categoryController } = require('../controllers');
const categoryMiddleware = require('../middlewares/category.middleware');

const router = express.Router();

router.post('/', validateJWT, categoryMiddleware, categoryController.createCategory);

module.exports = router;
