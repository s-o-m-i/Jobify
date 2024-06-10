const User = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select({
      password: 0,
    });
    const adminRole = user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied,User is not an admin." });
    }

    console.log(adminRole);
    res.status(200)
    //    console.log(user)
    next();
  } catch (error) {
    console.log("error in adminMiddleware", error);
  }
};

module.exports = adminMiddleware;
