const errorMiddleware = (err, req, res, next) => {
	err.message = err.message || "Internal Server Error";
	err.statusCode = err.statusCode || 500;
	// console.log("ABHI", err);
	console.error("stack",err.stack);
	// console.log(err);
	if (err.name === "ValidationError") {
		return res.status(err.statusCode).json({
			success: false,
			name: err.name,
			message: err.errors,
		});
	}
	if (err.name === "JsonWebTokenError") {
		return res.status(400).json({
			success: false,
			name: err.name,
			message: err.message,
		});
	}
	if (err.code && err.code === 11000) {
		return res.status(409).json({
			success: false,
			name: "DuplicateKeyError",
			keyValue: err.keyValue,
		});
	}
	console.log(err.message);
	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

module.exports = errorMiddleware;
