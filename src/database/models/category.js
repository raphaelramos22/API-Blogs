const createCategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define(
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
  return category;
};

module.exports = createCategoryModel