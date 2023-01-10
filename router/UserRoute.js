const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refresh,
} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);

module.exports = router;
