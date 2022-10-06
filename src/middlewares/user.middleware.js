const { userSchema } = require('./schemas');

const userMiddleware = async (req, res, next) => {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = userMiddleware;
