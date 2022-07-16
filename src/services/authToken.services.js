const JWT = require('./jwt.services');

const authToken = (req, _res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      const e = new Error('Token not found');
      e.code = 'UnauthorizedError';
      throw e;
    }
    const userAuth = JWT.validateToken(authorization);
    req.user = userAuth;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authToken;