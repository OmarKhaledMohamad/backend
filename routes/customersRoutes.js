// import express for router library
const express = require("express");
// import router module for use methods of router
const router = express.Router();
// include all methods from customer controller 
const {
    getCustomers,
    getCustomerById,
    createCustomer,
    deleteCustomer,
    updateCustomer
} = require("../controllers/customersController");
// import customer validator
const { CustomerValidator } = require("../helper/validator");
// Get All Customers
router.get("/", getCustomers,);
 
// Get Single Customer
router.get("/:id", getCustomerById);

// Create a new Customer with validation
router.post("/", CustomerValidator,createCustomer);
// Create a new Customer
router.patch("/:id", updateCustomer);
// Delete Customer
router.delete("/:id", deleteCustomer);
module.exports = router;
