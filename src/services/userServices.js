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
  const user = await User.create({ displayName, email, password, image });
  const token = JWT.createToken(user);
  return token;
};

const userAll = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return result;
};

const userId = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!result) {
    const e = new Error('User does not exist');
    e.code = 'NotFoundError';
    throw e;
  }

  return result;
};

const deleteUser = async (user) => {
  const deletedUser = await User.destroy({ where: { id: user.id } });

  return deletedUser;
};

module.exports = {
  userCreate,
  userAll,
  userId,
  deleteUser,
};