const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");
const handleHostelInfo = catchAsyncError(async (req, res, next) => {
  const { hostel_no } = req.params;

  const filePath = path.join(
    __dirname,
    "../public/Hostel/",
    `h${hostel_no}.md`
  );
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      // throw new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN",404)
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });
});

const handleLibraryInfo = catchAsyncError(async (req, res, next) => {
  const filePath = path.join(__dirname, "../public/Library/", `LIBRARY.md`);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });
});
const handleNccInfo =catchAsyncError(async(req,res,next)=>{

  const filePath = path.join(__dirname, "../public/NCC/", `NCC.md`);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });


})
const handlCccInfo =catchAsyncError(async(req,res,next)=>{

  const filePath = path.join(__dirname, "../public/Library/", `LIBRARY.md`);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });
  


})
const handleSportInfo =catchAsyncError(async(req,res,next)=>{

  const filePath = path.join(__dirname, "../public/Library/", `LIBRARY.md`);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });


})
const handleGuestHouseInfo =catchAsyncError(async(req,res,next)=>{

  const filePath = path.join(__dirname, "../public/Library/", `LIBRARY.md`);
  res.status(200).sendFile(filePath, (err) => {
    if (err) {
      next(new ErrorHandler("FILE DOESNOT EXIST CONTACT ADMIN", 404));
    }
  });


})
module.exports = {
  handleHostelInfo,
  handleLibraryInfo,
  handleNccInfo,
  handlCccInfo,
  handleSportInfo,
  handleGuestHouseInfo,
};
