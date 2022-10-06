const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.createUser);

router.get('/', validateJWT, userController.getAllUsers);

module.exports = router;