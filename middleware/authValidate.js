const jwt = require("jsonwebtoken");

const authValidate = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json("token error");
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    return res.status(401).json("User is not authorized or token is missing");
  }
};

module.exports = authValidate;
