const express = require("express");

const { signUp, login } = require("../controllers/auth.controller");
const {
  uploadjob,
  getjob,
  deleteJob,
  getUpdatedJobData,
  updateJob,
} = require("../controllers/job.controller");
const {
  getcompanies,
  uploadcompany,
  companyDetails,
  deleteCompany,
  getcompany,
  updatecompany,
} = require("../controllers/company.controller");

const verifyToken = require("../middlewares/middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/getcompanies").get(verifyToken, getcompanies);
router
  .route("/uploadcompany")
  .post(verifyToken, adminMiddleware, uploadcompany);
router.route("/getcompany/:id").get(verifyToken, getcompany);
router
  .route("/updatecompany/:id")
  .put(verifyToken, adminMiddleware, updatecompany);
router.route("/uploadjob").post(verifyToken, adminMiddleware, uploadjob);
router
  .route("/deleteCompany/:id")
  .delete(verifyToken, adminMiddleware, deleteCompany);
router.route("/deleteJob/:id").delete(verifyToken, adminMiddleware, deleteJob);
router.route("/getjob").get(verifyToken, getjob);
router.route("/companyDetails/:name").get(verifyToken, companyDetails);
router.route("/getUpdatedJobData/:id").get(verifyToken, getUpdatedJobData);
router.route("/updateJob/:id").put(verifyToken, adminMiddleware, updateJob);

module.exports = router;
