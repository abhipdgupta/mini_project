const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const multer = require("multer");
const { news } = require("../models/newsSchema");
const path = require("path");
const fs = require("fs")


const getAllNews = catchAsyncError(async (req, res, next) => {

  const limit=req.query.limit;
  let allNews
  if(limit){

   allNews = await news.find({}).sort({ createdAt: -1 }).limit(limit);

  }else{

    allNews = await news.find({}).sort({ createdAt: -1 });

  }
  if (!allNews || allNews.length === 0)
    throw new ErrorHandler("No News Feed available", 404);
  res.status(200).json({
    success: true,
    allNews: allNews,
  });
});

const deleteNewsById = catchAsyncError(async (req, res, next) => {
  const news_id = req.params.id;
  const deletednews = await news.findOneAndDelete({ _id: news_id });
  if (!deletednews) throw new ErrorHandler("Cannot delete the news", 404);
 console.log(deletednews);
  const dirToDlete=`public/${deletednews.newsFolderPath}`

  if (fs.existsSync(dirToDlete)) {
	try {
		fs.rmdirSync(dirToDlete,{ recursive: true });
		console.log('Directory deleted successfully.');
	  } catch (error) {
		console.error('Error deleting directory:', error);
		next( new ErrorHandler('Error deleting directory',500))
	  }
  }
  else {
	res.status(200).json({
		success: true,
		message: "news deleted with complications",
		newsid: news_id,
	  });
  }
  res.status(200).json({
    success: true,
    message: "news deleted",
    newsid: news_id,
  });
});
const getNewsById = catchAsyncError(async (req, res, next) => {
  const News = await news.findOne({ _id: req.params.id });

  if (!News) throw new ErrorHandler("No New Feed available", 404);
  res.status(200).json({
    success: true,
    News: News,
  });
});

const handleUploadNews = catchAsyncError(async (req, res, next) => {
  console.log("request body",req.body);
  console.log("request file", req.files);

  const { news_title, news_description,news_events_type } = req.body;
  const thumbnailPath = req.files.news_thumbnail[0].path
    .split("\\")
    .slice(1)
    .join("/");
  const imagesPath = req.files.news_events_images?.map((imageData) => {
    return imageData.path.split("\\").slice(1).join("/");
  });

  const markdownPath = req.files.news_events_markdown[0].path
    .split("\\")
    .slice(1)
    .join("/");

  const news_info = new news({
    title: news_title,
    description: news_description,
    thumbnailUrl: thumbnailPath,
    markdownFileUrl: markdownPath,
    imagesPath: imagesPath,
    newsFolderPath: `news/${req.newsFolder}/${req.insideFolder}`,
	type:news_events_type,
  });

  await news_info.save();

  return res.status(201).json({
    success: true,
    message: "uploaded",
  });
});
const handleImageFileStream = catchAsyncError((req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(
    __dirname,
    "../uploads/news_thumbnails",
    filename
  );

  res.setHeader("Content-Type", "image/jpg");

  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
  fileStream.on("error", (err) => {
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});
module.exports = {
  getAllNews,
  handleUploadNews,
  handleImageFileStream,
  getNewsById,
  deleteNewsById,
};
