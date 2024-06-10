const User = require("../models/user.model");

const Job = require("../models/job.model");

const uploadjob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const uploadedCompany = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      userId: req.user._id,
    });
    res.status(201).json({
      msg: "job created successfully",
      job: uploadedCompany,
      success: true,
    });
  } catch (error) {
    console.log("error in job company");
  }
};
const getjob = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments({ userId: req.user._id });
    const existingJobs = await Job.find({ userId: req.user._id })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).json({ msg: "jobs found", jobs: existingJobs, totalPages });
  } catch (error) {
    console.log("cannot get jobs", error);
    res.status(500).json({ error: "Cannot get jobs" });
  }
};
const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: "job deleted successfully", deletedJob, success: true });
  } catch (error) {
    console.log("error in deletedjobs", error);
  }
};
const getUpdatedJobData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Job.findById(id);

    if (!data) {
      return res.status(404).json({ msg: "Job not found", success: false });
    }

    res.status(200).json({ msg: "Data found", data: data, success: true });
  } catch (error) {
    console.log("Error in getUpdatedJobData", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found", success: false });
    }

    res.status(200).json({
      msg: "Job updated successfully",
      data: updatedJob,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateJob", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

module.exports = {
  uploadjob,
  getjob,

  deleteJob,

  getUpdatedJobData,
  updateJob,
};
