const { postService, categoryService, userService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const categories = await categoryService.getAll();
  if (!categoryIds.every(
    (categoryId) => categories.some((category) => category.id === categoryId),
    )) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  
  const token = req.header('Authorization');
  const userId = await userService.getUserId(token);
  
  const newPost = await postService.createPost({ title, content, categoryIds, userId });
  
  const post = await postService.getById(newPost.id);
  return res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAll();
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
};
