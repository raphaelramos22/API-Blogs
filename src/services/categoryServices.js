const { Category } = require('../database/models');

const categoryCreate = async (name) => {
  if (!name) {
    const e = new Error('"name" is required');
    e.code = 'ValidationError';
    throw e;
  }

  const result = await Category.create({ name });

  return result;
};

const categoryAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  categoryCreate,
  categoryAll,
}; 
