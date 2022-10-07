const { postSchema } = require('./schemas');

const postMiddleware = async (req, res, next) => {
  const validation = postSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = postMiddleware;
