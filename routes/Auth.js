const express = require("express");
const router = express.Router();
const authController = require("../controller/Auth");
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);
router.get("/logout", authController.postLogout);
module.exports = router;
