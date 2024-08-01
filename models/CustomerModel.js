// include the mongo database library 
const mongoose = require("mongoose");
// connect to the database
const Schema = mongoose.Schema;

// build in Customer Schema 
const customerSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerMobile: {
      type: String,
      required: true,
    },
    dateOfBirth: {
        type: Date,
        default: Date.now,
        required: true,
      },
    country: {
      type: String,
      required: true,
    },    
    city: {
      type: String,
      required: true,
    },
    emirate: {
        type: String,
        required: true,
      },

  },
  { timestamps: true }
);

// assign this Customer Schema as Customer Table
module.exports = mongoose.model("Customer", customerSchema);
