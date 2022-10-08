const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds, userId }) => {
  const t = await sequelize.transaction();
  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

    const postId = newPost.id;
    const newPostCategories = categoryIds.map((categoryId) => ({ categoryId, postId }));
    await PostCategory.bulkCreate(newPostCategories, { transaction: t });

    await t.commit();
    return newPost;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e;
  }
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
  });

  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getFullPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const updatePost = async ({ id, title, content }) => {
  await BlogPost.update({ title, content }, {
    where: {
      id,
    },
  });
};

module.exports = {
  createPost,
  getById,
  getAll,
  getFullPostById,
  updatePost,
};
