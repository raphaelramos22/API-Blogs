const createPostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      foreignKey: true,
      primaryKey: true,
      reference: { model: 'BlogPost', key: 'id' },
      type: DataTypes.INTEGER, 
    },
    categoryId: {
      primaryKey: true, 
      foreignKey: true,
      reference: { model: 'Category', key: 'id'},
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  }
  return PostCategory;
};

module.exports = createPostCategoryModel