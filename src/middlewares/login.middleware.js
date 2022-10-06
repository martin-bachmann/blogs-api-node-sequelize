const { loginSchema } = require('./schemas');

const loginMiddleware = async (req, res, next) => {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  } 
  next();
};

module.exports = loginMiddleware;
