const postServices = require('../services/postServices');

const postCreate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userEmail = req.user.email;
  try {
    const result = await postServices.postCreate(title, content, categoryIds, userEmail);
    res.status(201).json(result);
  } catch (error) {
    next(error);
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

const postId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postServices.postId(id);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCreate,
  postsAll,
  postId,
};