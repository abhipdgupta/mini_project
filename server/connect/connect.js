const db = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

db.set("strictQuery", false);
const mongoUrl = process.env.DB_URL;
// console.log(mongoUrl);
const connectDB = async () => {
	db.connect(mongoUrl, {
		useNewUrlParser: true,
	})
		.then((response) => {
			console.log("MONGODB ATLAS CONNECTION",{
				CONNECTED: {
					HOST: response.connections[0].host,
					PORT: response.connections[0].port,
					DATABASE: response.connections[0].name,
				},
			});
		})
		.catch((err) => {
			console.log(`err: ${err}`);
		});
};

module.exports = connectDB;
