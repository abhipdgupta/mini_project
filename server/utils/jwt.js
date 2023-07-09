const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const setjwt = async (user) => {
	const payload = {
		_id: user._id,
		email: user.email,
		username: user.username,
		role: user.role,
	};
	return await jwt.sign(payload, secret);
};

const getjwt = async (token) => {
	if (!token) return null;
	
	return await jwt.verify(token, secret);
};

module.exports = {
	setjwt,
	getjwt,
};
