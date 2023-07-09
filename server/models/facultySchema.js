const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const facultySchema = new mongoose.Schema(
  {
    role: {
      type: [String],
      enum: ["ADMIN", "STUDENT", "FACULTY", "OTHER"],
      default: ["FACULTY"],
    },
    profileImgPath: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          if (!email) {
            return false;
          }

          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

          if (!emailRegex.test(email)) {
            return false;
          }

          return true;
        },
        message: "email is invalid ",
      },
    },

    password: {
      type: String,
      required: [true, "passsword is required"],
      validate: {
        validator: function (password) {
          if (!password) {
            return false;
          }

          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

          if (!passwordRegex.test(password)) {
            return false;
          }

          return true;
        },
        message: "password is invalid ",
      },
    },
    facultyno: {
      type: String,
      required: [true, "rollno is required"],
      unique: true,
      validate: {
        validator: function (rollno) {
          if (!Number.isInteger(parseInt(rollno))) return false;

          return true;
        },
        message: "Should be a number ",
      },
    },
    phoneno: {
      type: String,
      required: [true, "phoneno is required"],
      validate: {
        validator: function (phoneno) {
          if (!/^[0-9]+$/.test(phoneno)) return false;

          return true;
        },
        message: "Should be a number ",
      },
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },

    department: {
      type: String,
      required: [true, "branch is required"],
    },

    about: {
      type: String,
    },

    teachSubjects: [
      {
        name: {
          type: String,
        },
        exams: [
          {
            name: {
              type: String,
            },
            filePath: {
              type: String,
            },
          },
        ],

        resources: [
          {
            title: {
              type: String,
            },
            filePath: {
              type: String,
            },
          },
        ],
      },
    ],
    username: {
      type: String,
      default: function () {
        return (
          this.name.replace(/[^a-zA-Z]+/g, "").toLowerCase() + this.facultyno
        );
      },
    },
  },
  { timestamps: true }
);

facultySchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

facultySchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("password is missing");

  try {
    const isPasswordCorrect = await bcrypt.compare(password, this.password);
    return isPasswordCorrect;
  } catch (error) {
    console.log(error.message);
  }
};

const faculties = mongoose.model("faculty", facultySchema);

module.exports = {
  faculties,
};
