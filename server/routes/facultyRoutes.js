const express = require("express");

const router = express.Router();

const {
	handleFacultyLogin,
	handleFacultySignup,
	handleSubjectTeaching,
	handleGetSubjectTeaching,
	handleAddExam,
	handleAddResource,
	handleAddSubject,
	handleDeleteSubject,
	handleDeleteResource,
	handleDeleteExam,
	handleFileStream,
	handleProfileUpdate,
	handleStudentInfo
} = require("../controller/faculty");

const { getjwt } = require("../utils/jwt");

const multer = require("multer");

const { mkdir } = require("fs");
const { authCheck } = require("../controller/auth");
const storage_exam = multer.diskStorage({
	destination: async function (req, file, cb) {
		cb(null, `./uploads/faculty/${req.username}`);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${req.body.exam_name}.pdf`);
	},
});

const upload_exam = multer({ storage: storage_exam });

const storage_resource = multer.diskStorage({
	destination: async function (req, file, cb) {
		cb(null, `./uploads/faculty/${req.username}`);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${req.body.resource_title}.pdf`);
	},
});

const upload_resource = multer({ storage: storage_resource });

const storage_profile = multer.diskStorage({
	destination: async function (req, file, cb) {
		cb(null, `./public/faculty-profile-image`);
	},
	filename: function (req, file, cb) {
		cb(null,`${req.body.name}.jpg` );
	},
});

const upload_profile = multer({ storage: storage_profile });
const makeUploadDir = async (req, res, next) => {

	mkdir(`uploads/faculty/${req.username}`, { recursive: true }, (err) => {
		if (err) console.log("cannot create directory", err);
	});
	
	next();
};
router.route("/signup").post(handleFacultySignup);

router.route("/login").post(handleFacultyLogin);

router.route("/subject-teaching/:username").get(handleGetSubjectTeaching);

router
	.route("/exam")
	.post(authCheck,makeUploadDir, upload_exam.single("exam_file"), handleAddExam)
	.delete(handleDeleteExam);

router
	.route("/resource")
	.post(
		authCheck,
		makeUploadDir,
		upload_resource.single("resource_file"),
		handleAddResource
	)
	.delete(handleDeleteResource);

router.route("/subject").post(authCheck,handleAddSubject).delete(authCheck,handleDeleteSubject);
router.route("/profile-update").post(authCheck,makeUploadDir, upload_profile.single("profileImg"),handleProfileUpdate)

router.route("/sudentinfo/:department").get(handleStudentInfo)
router.route("/uploads/faculty/:facultyfolder/:filename").get(handleFileStream);


router.route("/subject-teaching").post(handleSubjectTeaching);
module.exports = router;
