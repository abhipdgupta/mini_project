const { students } = require("../models/studentSchema");
const { setjwt, getjwt } = require("../utils/jwt");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

const handleStudentLogin = catchAsyncError(async (req, res, next) => {
	if (req.body.user_email === "" || req.body.user_password === "")
		throw new ErrorHandler("empty field(s)", 400);

	const student = await students.findOne({ email: req.body.user_email });

	if (student) {
		const isPasswordCorrect = await student.comparePassword(req.body.user_password);

		if (isPasswordCorrect) {
			const sessionId = await setjwt(student);

			res.status(200).json({
				success:true,
				name:student.name,
				username: student.username,
				email: student.email,
				rollno: student.rollno,
				tokenid: sessionId,
				role:student.role,
			});
		} else {
			throw new ErrorHandler("Password is incorrect", 401);
		}
	} else {
		throw new ErrorHandler("Email doesn't exist try SIGNUP", 404);
	}
});

const handleStudentSignup = catchAsyncError(async (req, res, next) => {
	const { name, email, password, rollno, phoneno, batch, address, branch } =
		req.body;
	
	const student_info = new students({
		name: name,
		email: email,
		password: password,
		rollno: rollno,
		phoneno: phoneno,
		batch: batch,
		address: address,
		branch: branch,
	});
	await student_info.save();

	res.status(201).json({
		success: true,
		created: true,
		student_info: student_info,
	});
});

module.exports = {
	handleStudentLogin,
	handleStudentSignup,
};
