const { check } = require("express-validator");

// User Validation
exports.registerValidator = [
  check("firstName", "firstName is Required").not().isEmpty(),
  check("lastName", "lastName is Required").not().isEmpty(),
  check("email", "Please include valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is Required").not().isEmpty(),
  check("confirmPassword", "confirmPassword is Required").not().isEmpty(),
];
// Customer Validation
exports.CustomerValidator = [
  check("customerName", "Customer Name is Required").not().isEmpty(),
  check("country", "Customer Name is Required").not().isEmpty(),
  check("city", "Customer Name is Required").not().isEmpty(),
  check("emirate", "Customer Name is Required").not().isEmpty(),
  check("dateOfBirth", "Customer Name is Required").not().isEmpty(),
  check("customerMobile", "Customer Mobile is Required").not().isEmpty(),
  check("customerEmail", "Please include valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
];
// Login Validation
exports.loginValidator = [
  check("email", "Please include valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is Required").not().isEmpty(),
];