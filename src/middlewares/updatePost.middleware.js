const { updatePostSchema } = require('./schemas');

const updatePostMiddleware = async (req, res, next) => {
  const validation = updatePostSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = updatePostMiddleware;
