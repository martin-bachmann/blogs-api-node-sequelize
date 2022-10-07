const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
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

module.exports = {
  createPost,
  getById,
};
