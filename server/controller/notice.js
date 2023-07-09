const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const multer = require("multer");
const { notice } = require("../models/noticeSchema");
const path = require("path");
const fs = require("fs");

const getAllNotice = catchAsyncError(async (req, res, next) => {

	const limit=req.query.limit
	let allNotice
	if(limit){
		allNotice = await notice.find({}).sort({ createdAt: -1 }).limit(limit);
	}
	else{
		allNotice = await notice.find({}).sort({ createdAt: -1 });
	}


	if (!allNotice || allNotice.length === 0)
		throw new ErrorHandler("No Notice Feed available", 404);
	res.status(200).json({
		success: true,
		allNotice: allNotice,
	});
});
const handleUploadNotice = catchAsyncError(async (req, res, next) => {
	const { notice_title } = req.body;
	const { path } = req.file;
	console.log(req.body);
	const notice_info = new notice({
		title: notice_title,
		pdfUrl: path,
	});

	await notice_info.save();

	return res.status(201).json({
		success: true,
		message: "uploaded",
		notice_info: {
			notice_title: notice_title,
		},
	});
});
const handlePdfFileStream = catchAsyncError(async (req, res, next) => {
	const { filename } = req.params;

	const pdfPath = path.join(__dirname, "../uploads/notice_pdf/", filename);

	res.setHeader("Content-Type", "application/pdf");
	// res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

	const fileStream = fs.createReadStream(pdfPath);

	fileStream.pipe(res);

	fileStream.on("error", (err) => {
		res.statusCode = 500;
		res.end("Internal Server Error");
	});
});
const getNoticeById = catchAsyncError(async (req, res, next) => {});
const deleteNoticeById = catchAsyncError(async (req, res, next) => {
	
	const notice_id = req.params.id;
	const deletednotice = await notice.deleteOne({ _id: notice_id });
	if (!deletednotice) throw new ErrorHandler("Cannot delete the news", 404);

	if (deletednotice.deletedCount === 1) {
		res.status(200).json({
			success: true,
			message: "notice deleted",
			noticeid: notice_id,
		});
	}
	if (deletednews.deletedCount === 0) {
		res.status(404).json({
			success: false,
			message: "invalid news id",
			noticeid: notice_id,
		});
	}
});

module.exports = {
	getAllNotice,
	handleUploadNotice,
	handlePdfFileStream,
	getNoticeById,
	deleteNoticeById,
};
