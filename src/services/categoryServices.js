const { category } = require('../database/models');

const categoryCreate = async (name) => {
  if (!name) {
    const e = new Error('"name" is required');
    e.code = 'ValidationError';
    throw e;
  }

  const result = await category.create({ name });

  return result;
};

module.exports = {
  categoryCreate,
};