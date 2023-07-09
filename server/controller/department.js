const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");
const { faculties } = require("../models/facultySchema");
const { students } = require("../models/studentSchema");

const handleDepartmentFacultyDetails = catchAsyncError(
  async (req, res, next) => {
    const department_name = req.params.department_name;
    console.log(req.params);
    const details = await faculties.find({
      department: department_name,
    });
    console.log("details", details);
    if (!details || details.length <= 0) {
      throw new ErrorHandler("UPDATING SOON", 404);
    }
    res.status(200).json({
      success: true,
      message: details,
    });
  }
);

const handleDepartmentStudentDetails = catchAsyncError(
  async (req, res, next) => {
    const department_name = req.params.department_name;
    console.log(req.params);
    const details = await students.find({
      branch: department_name,
    }).sort({batch:1}).sort({rollno:1});
    console.log("details", details);
    if (!details || details.length <= 0) {
      throw new ErrorHandler("UPDATING SOON", 404);
    }
    res.status(200).json({
      success: true,
      message: details,
    });
  }
);
module.exports = {
  handleDepartmentFacultyDetails,
  handleDepartmentStudentDetails,
};
