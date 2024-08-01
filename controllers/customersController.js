
// include the mongo database  library
const mongoose = require("mongoose");
// include  Customer Model 
const Customer = require("../models/CustomerModel");
// include  responsesStatus  constant  for status codes  and messages
const responsesStatus = require("../enum/responsesStatus");
// include validator library for apply validation (third party library)
const {validationResult} = require("express-validator");

// Get All Customers
const getCustomers = async (req, res) => {
  // connecting with db for get all customers
  const customers = await Customer.find({});
  try {
    // if response from db is ok return the data as formate json
    res.status(responsesStatus.OK).json(customers);
  } catch (error) {
    // if response from db is not ok return error
    res.status(responsesStatus.NotFound).json({ error: "Not Found" });
  }
};
// Get customer By Id - req -> request | res -> response
const getCustomerById = async (req, res) => {
  // get params id from request 
    const { id } = req.params;
    try {
      // check if id sended is respect mongo db criteria
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
      }
      // connecting with db for get customer by id
      const customer = await Customer.findById(id); 
      // if not object that means the customer not found 
      if (!customer) {
        res.status(responsesStatus.NotFound).json({ error: "No Such Customer!" });
      }
    // if response from db is ok return the data as formate json
    res.status(responsesStatus.OK).json(customer);
    } catch (error) {
      res.status(responsesStatus.BadRequest).json({ error: error.message });
    }
  };
// Create new Customer
const createCustomer = async (req, res) => {
  // Get all Attributes from request to handing it in add function
  const {
    customerName,
    customerEmail,
    customerMobile,
    dateOfBirth,
    country,
    city,
    emirate,
  } = req.body;
  // add Customer to db
  try {
    //  apply validation on all fileds - you can con to validationResult 
    //  was include up of file and you can see the validation rules
    const errors = validationResult(req);
    // if there is any error return the error as response
    if (!errors.isEmpty()) {
      return res.status(responsesStatus.BadRequest).json({
        success: false,
        msg: "Error",
        errors: errors.array(),
      });
    }
    // check here if email customer is exist or not  
      const isExistCustomer = await Customer.findOne({customerEmail}) 
      // if exist  return the email is exist error as response
      if(isExistCustomer){
         return res.status(responsesStatus.BadRequest).json({
           success: false,
           msg: "Email is Exist",
         });
      }
      // if not exist then add new customer to db  
      const customer = await Customer.create({
      customerName,
      customerEmail,
      customerMobile,
      dateOfBirth,
      country,
      city,
      emirate,
      });
     // if there isn't any error return the result as json response  
    res.status(responsesStatus.OK).json({
      success: true,
      msg: "Customer Registered Successfully",
      data: customer,
    });
  } catch (error) {
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};
// Delete Customer
const deleteCustomer = async (req, res) => {
  // get id from request url
  const { id } = req.params;

  try {
    // check id is respect mongodb criteria
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    // check find customer and apply delete function on database
    const customer = await Customer.findByIdAndDelete({ _id: id });
    // if delete function fall down return as error response
    if (!customer) {
      return res
        .status(responsesStatus.NotFound)
        .json({ error: "No Such Customer!" });
    }
    // return result as json response 
    res.status(responsesStatus.OK).json(customer);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
// Update Customer
const updateCustomer = async (req, res) => {
  // get id from request 
  const { id } = req.params;
  try {
    // check id is respect mongodb criteria
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    // find the customer and apply the new  changes to database
    const customer = await Customer.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    // if update function has some problems return as error response
    if (!customer) {
      return res
        .status(responsesStatus.BadRequest)
        .json({ error: "Not Found!" });
    }
    // return success result as json response 
    res.status(responsesStatus.OK).json(customer);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
// this option exports for i can import in another files 
module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    deleteCustomer,
    updateCustomer
};
