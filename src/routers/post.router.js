const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { postController } = require('../controllers');
const postMiddleware = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', validateJWT, postMiddleware, postController.createPost);

router.get('/', validateJWT, postController.getAllPosts);

module.exports = router;