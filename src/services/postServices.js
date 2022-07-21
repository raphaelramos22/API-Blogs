const Joi = require('joi');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1),
});
const schemaUpdated = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const categoryNotExists = async () => {
    const e = new Error('"categoryIds" not found');
    e.code = 'ValidationError';
    throw e;
};
const ValidationErro = (title, content, categoryIds) => {
const { error } = schema.validate({ title, content, categoryIds });
  if (error) {
    const e = new Error('Some required fields are missing');
    e.code = 'ValidationError';
    throw e;
  }
};

const postCreate = async (title, content, categoryIds, user) => {
  const t = await sequelize.transaction();
   ValidationErro(title, content, categoryIds);
  try {
    const { id } = await User.findOne({ where: { email: user } }, { transaction: t });
      await Category.findAll(
      { where: { id: categoryIds } }, { transaction: t },
      );
   
    const result = await BlogPost.create({ title, content, userId: id }, { transaction: t });
    
    await Promise.all(categoryIds.map((item) => PostCategory
    .create({ postId: result.id, categoryId: item }, { transaction: t })));
    
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    return categoryNotExists();
  }
};

const postsAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return posts;
};

const postId = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  if (!post) {
    const e = new Error('Post does not exist');
    e.code = 'NotFoundError';
    throw e;
  }
  return post;
};

const ValidationUpdated = (title, content) => {
  const { error } = schemaUpdated.validate({ title, content });
    if (error) {
      const e = new Error('Some required fields are missing');
      e.code = 'ValidationError';
      throw e;
    }
  };

const postUpdated = async (title, content, id, email) => {
  ValidationUpdated(title, content);
  const user = await User.findOne({ where: { email } });

  const posts = await BlogPost.findAll({
    where: { [Op.and]: [{ id }, { userId: user.id }] } });

  if (posts.length === 0) {
    const e = new Error('Unauthorized user');
    e.code = 'UnauthorizedError';
    throw e;
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return result;
};

const postIdDelete = async (id, user) => {
  const post = await postId(id);
  if (post.user.id !== user.id) {
 const e = new Error('Unauthorized user');
  e.code = 'UnauthorizedError';
  throw e;
} 
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  postCreate,
  postsAll,
  postId,
  postUpdated,
  postIdDelete,
};