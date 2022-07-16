const createCategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'Categories',
      timestamps: false,
    },
  );
  return Category;
};

module.exports = createCategoryModel