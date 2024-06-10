const User = require("../models/user.model");





const signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: "user already exists" });
      }
      const userCreated = await User.create({ username, email, password });
      res.status(201).json({
        msg: "user created",
        user: userCreated,
        token: await userCreated.generateToken(),
      });
    } catch (error) {
      console.log("user is not created", error);
    }
  };
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if(!existingUser){
        return    res.status(400).json({
          msg: "User do not exist",
        });
      }
      res.status(201).json({
        msg: "User finded",
        user: existingUser,
        success:true,
        token: await existingUser.generateToken(),
      });
    } catch (error) {
      console.log("user is not find login api", error);
    }
  };
  


  module.exports = {
    signUp,
    login,

  };
  