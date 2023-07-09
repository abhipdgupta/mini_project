const { faculties } = require("../models/facultySchema");
const {students}=require("../models/studentSchema")
const { setjwt, getjwt } = require("../utils/jwt");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

const handleFacultyLogin = catchAsyncError(async (req, res, next) => {
  if (req.body.user_email === "" || req.body.user_password === "")
    throw new ErrorHandler("empty field(s)", 400);

  const faculty = await faculties.findOne({ email: req.body.user_email });

  if (faculty) {
    const isPasswordCorrect = await faculty.comparePassword(
      req.body.user_password
    );

    if (isPasswordCorrect) {
      const sessionId = await setjwt(faculty);

      res.status(200).json({
        success: true,
        username: faculty.username,
        email: faculty.email,
        rollno: faculty.rollno,
        tokenid: sessionId,
        role: faculty.role,
      });
    } else {
      throw new ErrorHandler("Password is incorrect", 401);
    }
  } else {
    throw new ErrorHandler("Email doesn't exist try SIGNUP", 404);
  }
});

const handleFacultySignup = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    username,
    facultyno,
    phoneno,
    address,
    department,
  } = req.body;

  const faculty_info = new faculties({
    name: name,
    email: email,
    password: password,
    username: username,
    facultyno: facultyno,
    phoneno: phoneno,
    address: address,
    department: department,
  });
  await faculty_info.save();

  res.status(201).json({
    success: true,
    created: true,
    faculty_info: faculty_info,
  });
});

const handleSubjectTeaching = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  const result = await getjwt(authHeader);
});

const handleGetSubjectTeaching = catchAsyncError(async (req, res, next) => {

  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  // console.log("authheader:", authHeader);
  if (!authHeader) {
    throw new ErrorHandler("NOT AUTHENTICATED", 401);
  }
  const facultyUserName = req.params.username;

  const faculty = await faculties.findOne({
    username: facultyUserName,
  });

  if (!faculty) {
    throw new ErrorHandler("404 NOT FOUND", 404);
  }

  const result = await getjwt(authHeader);

  if (!result) {
    throw new ErrorHandler("UNAUTHORIZED ACCOUNT", 401);
  } else if (
    result.role.includes("STUDENT") || result.role.includes("FACULTY") ||
    (result.role.includes("FACULTY") && result.username === facultyUserName)
  ) {
    return res.status(200).json({
      success: true,
      message: faculty,
    });
  } else {
    throw new ErrorHandler("UNAUTHORIZED ACCOUNT", 401);
  }
});

const handleAddExam = catchAsyncError(async (req, res, next) => {
  await faculties.updateOne(
    {
      username: req.username,
      "teachSubjects.name": req.body.exam_subject,
    },
    {
      $push: {
        "teachSubjects.$.exams": {
          name: req.body.exam_name,
          filePath: req.file.path,
        },
      },
    }
  );

  const faculty = await faculties.findOne(
    {
      username: req.username,
    },
    { teachSubjects: 1 }
  );

  return res.status(200).json({
    success: true,
    message: faculty,
  });
});
const handleAddResource = catchAsyncError(async (req, res, next) => {
  await faculties.updateOne(
    {
      username: req.username,
      "teachSubjects.name": req.body.resource_subject,
    },
    {
      $push: {
        "teachSubjects.$.resources": {
          title: req.body.resource_title,
          filePath: req.file.path,
        },
      },
    }
  );

  const faculty = await faculties.findOne(
    {
      username: req.username,
    },
    { teachSubjects: 1 }
  );

  return res.status(200).json({
    success: true,
    message: faculty,
  });
});
const handleAddSubject = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  const result = await getjwt(authHeader);

  await faculties.updateOne(
    {
      username: result.username,
    },
    {
      $push: {
        teachSubjects: {
          name: req.body.subject_name,
          exams: [],
          resources: [],
        },
      },
    }
  );

  const faculty = await faculties.findOne(
    {
      username: result.username,
    },
    { teachSubjects: 1 }
  );

  return res.status(200).json({
    success: true,
    message: faculty,
  });
});

const handleDeleteSubject = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  const result = await getjwt(authHeader);

  await faculties.updateOne(
    {
      username: result.username,
    },
    { $pull: { teachSubjects: { _id: req.body.subject_id } } }
  );
  const faculty = await faculties.findOne(
    {
      username: result.username,
    },
    { teachSubjects: 1 }
  );
  return res.status(200).json({
    success: true,
    message: faculty,
  });
});
const handleDeleteResource = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  const result = await getjwt(authHeader);

  const faculty = await faculties.findOneAndUpdate(
    {
      username: result.username,
      "teachSubjects.resources._id": req.body.resource_id,
    },
    { $pull: { "teachSubjects.$.resources": { _id: req.body.resource_id } } },
    { new: true, projection: { teachSubjects: 1 } }
  );
  return res.status(200).json({
    success: true,
    message: faculty,
  });
});

const handleDeleteExam = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  const result = await getjwt(authHeader);

  const faculty = await faculties.findOneAndUpdate(
    { username: result.username, "teachSubjects.exams._id": req.body.exam_id },
    { $pull: { "teachSubjects.$.exams": { _id: req.body.exam_id } } },
    { new: true, projection: { teachSubjects: 1 } }
  );
  return res.status(200).json({
    success: true,
    message: faculty,
  });
});

const handleFileStream = catchAsyncError(async (req, res, next) => {
  const { filename, facultyfolder } = req.params;

  const pdfPath = path.join(
    __dirname,
    "../uploads/faculty/",
    facultyfolder,
    filename
  );

  res.setHeader("Content-Type", "application/pdf");
  // res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  const fileStream = fs.createReadStream(pdfPath);

  fileStream.pipe(res);

  fileStream.on("error", (err) => {
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});

const handleProfileUpdate = catchAsyncError(async (req, res, next) => {

  await faculties.updateOne(
    {
      username: req.username,
    },
    {
      $set: {
        profileImgPath: req.file.path.replace('public',''),
      },
    }
  );
  const faculty = await faculties.findOne({
    username: req.username,
  },
  { profileImgPath: 1 });
  return res.status(200).json({
    success: true,
    message: faculty,
  });
});

const handleStudentInfo = catchAsyncError(async (req, res, next) => {


  const department = req.params.department;

  const studentinfo=await students.find({branch:department})
  
  if(studentinfo.length==0){
      throw new ErrorHandler("No Student data available",404)
  }
  return res.status(200).json({
    success: true,
    message: studentInfo,
  });
});


module.exports = {
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
};
