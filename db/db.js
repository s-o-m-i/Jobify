const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/jobify`);
    console.log("connected to database");
  } catch (error) {
    console.log("database connection failed", error);
  }
};

module.exports = connectDB;
