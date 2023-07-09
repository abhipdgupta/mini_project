const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getAllNews,
  handleUploadNews,
  handleImageFileStream,
  getNewsById,
  deleteNewsById,
} = require("../controller/news");
const { adminAuth } = require("../controller/auth");

const fs = require("fs");
//multer configs
const multer = require("multer");

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/news/${req.newsFolder}/${req.insideFolder}`);
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadImages = multer({ storage: storageImages });

const makeUploadDir = async (req, res, next) => {
  console.log(req);
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();

  const folderName = `${day}_${month}_${year}`;
  const insideFolder = `${Date.now()}`;

  fs.mkdirSync(
    `public/news/${folderName}/${insideFolder}`,
    { recursive: true },
    (err) => {
      if (err) console.log("cannot create directory", err);
    }
  );
  req.newsFolder = folderName;
  req.insideFolder = insideFolder;

  next();
};

router
  .route("/")
  .get(getAllNews)
  .post(
    adminAuth,
    makeUploadDir,
    uploadImages.fields([
      { name: "news_thumbnail" },
      { name: "news_events_images" },
      { name: "news_events_markdown" },
    ]),
    handleUploadNews
  );

router.route("/:id").get(getNewsById).delete(adminAuth, deleteNewsById); // TODO: implement admin Auth

router.get("/uploads/news_thumbnails/:filename", handleImageFileStream);



module.exports = router;
