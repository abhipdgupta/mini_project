const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./connect/connect");
const dotenv = require("dotenv");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const os = require("os");

// import routes
const loginRoute = require("./routes/loginRoute");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const newsRoutes = require("./routes/newsRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const verifyTokenRoute = require("./routes/verifyToken");
//configuration
app.use(cors());

app.use(express.json());
app.use("/server",express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
dotenv.config();

connectDB();

app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");

  next();
});


//routes use

// app.use("/", staticRoutes);
app.use("/server/verify-user", verifyTokenRoute);
app.use("/server/login", loginRoute);
app.use("/server/student", studentRoutes);
app.use("/server/faculty", facultyRoutes);
app.use("/server/news-events", newsRoutes);
app.use("/server/notice", noticeRoutes);
app.use("/server/department", departmentRoutes);
app.use("/server/facility", facilityRoutes);



// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  const interfaces = os.networkInterfaces();
  let address;
  Object.keys(interfaces).forEach((ifname) => {
    interfaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        address = iface.address;
      }
    });
  });

  if (!address) address = "127.0.0.1";

  console.log(`Server listening on http://${address}:${port}`);
});

app.use(errorMiddleware);
