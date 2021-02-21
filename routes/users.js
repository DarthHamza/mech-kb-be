const express = require("express");
const controller = require("../controllers/users");
const passport = require("passport");
const router = express.Router();

router.post("/signup", controller.signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
); // will explain session false LATER

module.exports = router;
