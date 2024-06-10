const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      contact: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref: "User",
      required:true,
    }
  },
  { timestamps: true }
);

const Job = new model("Job", jobSchema);
module.exports = Job;
