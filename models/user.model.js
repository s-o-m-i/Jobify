const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      username: this.username,
      email: this.email,
      password: this.password,
    
    },
    "jobify",
    { expiresIn: "30d" }
  );
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
