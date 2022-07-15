const Joi = require('joi');
const JWT = require('./jwt.services');
const { User } = require('../database/models');

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

const login = async (email, password) => {
  const { error } = schema.validate({ email, password });

  if (error) {
    const e = new Error('Some required fields are missing');
    e.code = 'ValidationError';
    throw e;
  }

  const userLogin = await User.findOne({ where: { email, password } });

  if (!userLogin) {
    const e = new Error('Invalid fields');
    e.code = 'ValidationError';
    throw e;
  } 

  const token = JWT.createToken(email);

  return token;
};

module.exports = { 
  login,
};
