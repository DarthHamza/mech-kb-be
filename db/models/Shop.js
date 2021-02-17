const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });
  return Shop;
};
