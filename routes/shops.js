const express = require("express");
const controller = require("../controllers/shops");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const shopFound = await controller.fetchShop(shopId, next);
  if (shopFound) {
    req.shop = shopFound;
    next();
  } else {
    const error = new Error("Shop Not Found");
    error.status = 404;
    next(error);
  }
});

// single: uploading one image only
// "image": the name of the model field where we want to save the image

router.get("/", controller.shopList);
router.post("/", upload.single("image"), controller.shopCreate);
router.get("/:shopId", controller.shopDetail);
router.put("/:shopId", upload.single("image"), controller.shopUpdate);
router.delete("/:shopId", controller.shopDelete);
router.post(
  "/:shopId/products",
  upload.single("image"),
  controller.productCreate
);

module.exports = router;
