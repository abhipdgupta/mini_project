const express = require("express");

const router = express.Router();

const {
	handleStudentSignup,
	handleStudentLogin,
} = require("../controller/student");

router.route("/signup").post(handleStudentSignup)

router.route("/login").post(handleStudentLogin)

module.exports = router;
