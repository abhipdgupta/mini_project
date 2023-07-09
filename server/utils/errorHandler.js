class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		// console.log("inside error handler");
	}
}

module.exports= ErrorHandler;
