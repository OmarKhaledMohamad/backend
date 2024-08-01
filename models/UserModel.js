// include the mongo database library 
const mongoose = require("mongoose");
// connect to the database
const Schema = mongoose.Schema;

// build in User Schema 
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // link to role table
    roleId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

// assign this User Schema as User Table
module.exports = mongoose.model("User", userSchema);
