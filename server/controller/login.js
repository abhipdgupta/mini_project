const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { handleStudentLogin } = require("../controller/student");
const {handleFacultyLogin} =require("../controller/faculty")

const handleLogin = catchAsyncError(async (req, res, next) => {
	if (req.body?.user_role === "STUDENT") {
		return await handleStudentLogin(req, res, next);
	}
	if (req.body?.user_role === "FACULTY") {
		return	await handleFacultyLogin(req, res, next);
	}
	 else {
		throw new ErrorHandler("INVALID OPERATION", 404);
	}
});
module.exports = {
	handleLogin,
};
