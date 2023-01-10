const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/UserController");

router.post("/", registerUser);

module.exports = router;
