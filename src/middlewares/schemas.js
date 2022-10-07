const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
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

module.exports = { loginSchema, userSchema, categorySchema };