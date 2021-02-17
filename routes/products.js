const express = require("express");
const controller = require("../controllers/products");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("productId", async (req, res, next, productId) => {
  const productFound = await controller.fetchProduct(productId, next);
  if (productFound) {
    req.product = productFound;
    next();
  } else {
    const error = new Error("Product Not Found");
    error.status = 404;
    next(error);
  }
});

// single: uploading one image only
// "image": the name of the model field where we want to save the image

router.get("/", controller.productList);
router.get("/:productId", controller.productDetail);
router.put("/:productId", upload.single("image"), controller.productUpdate);
router.delete("/:productId", controller.productDelete);

module.exports = router;
