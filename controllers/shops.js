const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shopFound = await Shop.findByPk(shopId);
    if (shopFound) return shopFound;
    else next({ message: "Shop does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: req.body,
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.status(200).json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    req.body.userId = req.user.id; // req.user is coming from jwt strategy
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res, next) => {
  res.status(200).json(req.shop);
};

exports.shopUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.shop.update(req.body);
  res.status(200).json(req.shop);
};

exports.shopDelete = async (req, res, next) => {
  await req.shop.destroy();
  res.status(204).end();
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      // coming from route params middleware
      req.body.shopId = req.shop.id;
      if (req.file)
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      next({
        status: 401,
        message: "Don't you dare create a product in ma shop!!!",
      });
    }
  } catch (error) {
    next(error);
  }
};
