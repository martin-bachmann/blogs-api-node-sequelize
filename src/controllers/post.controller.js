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

const getFullPost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getFullPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const token = req.header('Authorization');
  const userId = await userService.getUserId(token);
  const post = await postService.getById(id);
  if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  await postService.updatePost({ id, title, content });

  const updatedPost = await postService.getFullPostById(id);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const token = req.header('Authorization');
  const userId = await userService.getUserId(token);
  const post = await postService.getById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  await postService.deletePost({ id });

  return res.status(204).end();
};

module.exports = {
  createPost,
  getAllPosts,
  getFullPost,
  updatePost,
  deletePost,
};
