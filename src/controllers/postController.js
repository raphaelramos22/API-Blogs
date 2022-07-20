const postServices = require('../services/postServices');

const postCreate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userPassword = req.user;
  try {
    const result = await postServices.postCreate(title, content, categoryIds, userPassword);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postCreate,
};