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
const postsAll = async (_req, res, next) => {
  try {
    const posts = await postServices.postsAll();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCreate,
  postsAll,
};