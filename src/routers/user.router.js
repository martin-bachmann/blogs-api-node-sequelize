const express = require('express');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.createUser);

module.exports = router;