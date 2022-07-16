const categoryService = require('../services/categoryServices');

const categoryCreate = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await categoryService.categoryCreate(name);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  categoryCreate,
};