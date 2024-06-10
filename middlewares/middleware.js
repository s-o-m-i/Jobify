const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, "jobify");
    const myuser = await User.findOne({ email: decoded.email });
    if (!myuser) {
      return res.status(404).send({ message: "User not found!" });
    }
    req.user = myuser;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

module.exports = verifyToken;
