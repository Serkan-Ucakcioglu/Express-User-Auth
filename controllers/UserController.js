const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(404).json({ message: "already user" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPass,
    });
    return res.status(201).json({ message: "Created User", user: user.email });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Errors" });
  }
};

module.exports = {
  registerUser,
};
