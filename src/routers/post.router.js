const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { postController } = require('../controllers');
const postMiddleware = require('../middlewares/post.middleware');
const updatePostMiddeware = require('../middlewares/updatePost.middleware');

const router = express.Router();

router.get('/search', validateJWT, postController.getByQuery);

router.post('/', validateJWT, postMiddleware, postController.createPost);

router.get('/', validateJWT, postController.getAllPosts);

router.get('/:id', validateJWT, postController.getFullPost);

router.put('/:id', validateJWT, updatePostMiddeware, postController.updatePost);

router.delete('/:id', validateJWT, postController.deletePost);

module.exports = router;