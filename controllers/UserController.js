const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    const checkPass = await bcrypt.compare(password, checkUser.password);
    if (checkUser && checkPass) {
      const option = {
        user: {
          email: checkUser.email,
          id: checkUser._id,
        },
      };
      const accessToken = jwt.sign(option, process.env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(option, process.env.REFRESH_TOKEN, {
        expiresIn: "1d",
      });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
    } else {
      res.status(404).json({ message: "No user register please !" });
    }
  } catch (error) {
    res.status(404).json({ message: "err" });
  }
};

const refresh = async (req, res) => {
  const cookie = await req.cookies;
  if (!cookie) return res.status(401).json("unauth");

  const refresh = cookie.jwt;

  jwt.verify(refresh, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "forbidden " });
    }

    const user = await User.findOne({ email: decoded.user.email }).exec();

    if (!user) return res.status(401).json("unauth");

    const option = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    const accessToken = jwt.sign(option, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  });
};

module.exports = {
  registerUser,
  loginUser,
  refresh,
};
