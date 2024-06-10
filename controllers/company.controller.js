
const mongoose = require("mongoose");
const Company = require("../models/company.model");
const Job = require("../models/job.model");

const getcompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const existingCompanies = await Company.find({ userId: req.user._id })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCompanies = await Company.countDocuments({
      userId: req.user._id,
    });

    res.status(200).json({
      msg: "companies found",
      companies: existingCompanies,
      totalPages: Math.ceil(totalCompanies / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("cannot get companies", error);
    res.status(500).json({ error: "Cannot get companies" });
  }
};

const uploadcompany = async (req, res) => {
  try {
    const { name, address, contact, email } = req.body;
    console.log("somi bhai", req.user);
    const uploadedCompany = await Company.create({
      name,
      address,
      contact,
      email,
      userId: req.user._id,
    });
    res.status(201).json({
      msg: "company created successfully",
      company: uploadedCompany,
      success: true,
    });
  } catch (error) {
    console.log("error in uplaod company", error);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ msg: "Company not found" });
    }

    res.json({
      msg: "Company deleted successfully",
      deletedCompany,
      success: true,
    });
  } catch (error) {
    console.error("Error in deleting company:", error);
    res.status(500).json({ msg: "Server error" });
  }
};






const companyDetails = async (req, res) => {
    const name = req.params.name;
    try {
      const findedJobs = await Job.find({ company: name });
      res.status(200).json({ msg: "details get", findedJobs });
    } catch (error) {
      console.log("error in compnayDetails", error);
    }
  };
  const getcompany = async (req, res) => {
    try {
      const id = req.params.id;
      const findedData = await Company.findById(id);
      res.status(200).json({ msg: "finded successfull", findedData });
    } catch (error) {
      console.log("error in updateCompany api", error);
    }
  };
  const updatecompany = async (req, res) => {
    try {
      const id = req.params.id;
      
      // Log the received id
      console.log('Received ID:', id);
  
      // Validate if the id is present and is a valid ObjectId
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid company ID' });
      }
  
      const { name, address, contact, email } = req.body;
  
      // Ensure userId is defined
      if (!req.user || !req.user._id) {
        return res.status(400).send({ error: 'User ID is missing' });
      }
  
      const updateCompany = await Company.findByIdAndUpdate(
        id,
        { name, address, contact, email, userId: req.user._id.toString() },  // Ensure userId is a string
        { new: true }
      );
  
      // Check if the company was found and updated
      if (!updateCompany) {
        return res.status(404).send({ error: 'Company not found' });
      }
  
      res.send(updateCompany);
    } catch (error) {
      console.error('Error in updateCompany:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };





module.exports = {
 
    getcompanies,
    uploadcompany,

    companyDetails,
    deleteCompany,

    getcompany,
    updatecompany,
  
   
  };
  