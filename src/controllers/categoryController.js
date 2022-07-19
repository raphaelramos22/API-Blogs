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
const categoryAll = async (_req, res, next) => {
  try {
    const result = await categoryService.categoryAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryCreate,
  categoryAll,
};