const express = require("express");
const {
	getAllNotice,
	handleUploadNotice,
	handlePdfFileStream,
	getNoticeById,
	deleteNoticeById,
} = require("../controller/notice");
const { adminAuth } = require("../controller/auth");
const router = express.Router();
//multer configs
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/notice_pdf");
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${req.body.notice_title}.pdf`);
	},
});

const upload = multer({ storage });

router
	.route("/")
	.get(getAllNotice)
	.post(adminAuth, upload.single("notice_pdf"), handleUploadNotice);

router.route("/:id")
.get(getNoticeById)
.delete(adminAuth, deleteNoticeById);

router.get("/uploads/notice_pdf/:filename", handlePdfFileStream);

module.exports = router;
