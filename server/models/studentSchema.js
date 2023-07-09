const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    role: {
      type: [String],
      enum: ["ADMIN", "STUDENT", "FACULTY", "OTHER"],
      default: ["STUDENT"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
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
    rollno: {
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
    batch: {
      type: String,
      required: [true, "batch is required"],
      validate: {
        validator: function (batch) {
          const pattern = /^\d{4}-\d{4}$/;

          if (!pattern.test(batch)) return false;

          return true;
        },
        message: "format is invalid(eg.2020-2024)",
      },
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },

    branch: {
      type: String,
      required: [true, "branch is required"],
    },

    username: {
      type: String,
      default: function () {
        return this.name.replace(/[^a-zA-Z]+/g, "").toLowerCase() + this.rollno;
      },
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

studentSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("password is missing");

  try {
    const isPasswordCorrect = await bcrypt.compare(password, this.password);
    return isPasswordCorrect;
  } catch (error) {
    console.log(error.message);
  }
};

const students = mongoose.model("student", studentSchema);

module.exports = {
  students,
};
