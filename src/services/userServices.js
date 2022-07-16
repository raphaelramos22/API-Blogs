const Joi = require('joi');
const { User } = require('../database/models');
const JWT = require('./jwt.services');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const userCreate = async (displayName, email, password, image) => {
  const { error } = schema.validate({ displayName, email, password, image });

  if (error) {
    const e = new Error(error.message);
    e.code = 'ValidationError';
    throw e;
  }

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    const e = new Error('User already registered');
    e.code = 'ConflictError';
    throw e;
  }
  await User.create({ displayName, email, password, image });
  const token = JWT.createToken(password);
  return token;
};

const userAll = async () => {
  const result = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return result;
};

module.exports = {
  userCreate,
  userAll,
};