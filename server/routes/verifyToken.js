const express = require("express");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { getjwt } = require("../utils/jwt");
// const ErrorHandler = require("./errorHandler");
const router = express.Router();

router.get(
	"/",
	catchAsyncError(async (req, res, next) => {
	
		const authHeader = req.headers.authorization
			? req.headers.authorization.split(" ")[1]
			: "";
		
		const result = await getjwt(authHeader);

		return res.json({
			success: true,
			message: result,
		});
	})
);
module.exports = router;
