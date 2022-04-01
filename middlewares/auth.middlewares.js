require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.body);
  const token =
    req.body.token || req.query.token || req.header["x-access-token"];
  if (!token) {
    return res.status(403).send("A access token is required for auth.");
  } else {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    try {
    } catch (err) {
      return (401).send("Invalid access token.");
    }
  }
  return next();
};

module.exports = verifyToken;
