// include the mongo database library 
const mongoose = require("mongoose");
// connect to the database
const Schema = mongoose.Schema;

// build in Role Schema
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// assign this Role Schema as Role Table
module.exports = mongoose.model("Role", roleSchema);
