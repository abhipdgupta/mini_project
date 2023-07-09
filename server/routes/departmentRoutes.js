const express = require("express");
const { handleDepartmentFacultyDetails,handleDepartmentStudentDetails } = require("../controller/department");

const router = express.Router();

router.route("/:department_name/faculty").get(handleDepartmentFacultyDetails);
router.route("/:department_name/student").get(handleDepartmentStudentDetails);

















module.exports=router;