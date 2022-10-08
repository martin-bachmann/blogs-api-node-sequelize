const Joi = require('joi');

const FIELDS_MISSING_ERROR = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
  password: Joi.string().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
});

const userSchema = Joi.object({
  displayName: Joi.string().required().min(8).messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string().messages({

  }),
});

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
  content: Joi.string().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': FIELDS_MISSING_ERROR,
  }),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
  content: Joi.string().required().messages({
    'string.empty': FIELDS_MISSING_ERROR,
  }),
});

module.exports = { loginSchema, userSchema, categorySchema, postSchema, updatePostSchema };