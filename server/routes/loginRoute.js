const express = require("express");
const router = express.Router();

const {handleLogin} = require('../controller/login');


router.route("/").post(handleLogin)

module.exports = router;
