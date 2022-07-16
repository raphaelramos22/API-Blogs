const categoryService = require('../services/categoryServices');

const categoryCreate = async (req, res, next) => {
  try {
    const { name } = req.body;
    await categoryService.categoryCreate(name);
    res.status(201).json({ name });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryCreate,
};