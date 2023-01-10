const mongoose = require("mongoose");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchame = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchame);
