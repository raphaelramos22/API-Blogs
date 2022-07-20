const Joi = require('joi');
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1),
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
    const { id } = await User.findOne({ where: { password: user } }, { transaction: t });
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

const allPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return posts;
};

module.exports = {
  postCreate,
  allPosts,
};