// include the mongo database  library
const mongoose = require("mongoose");
// include  Role  Model 
const Role = require("../models/RoleModel");
// include  responsesStatus  constant  for status codes  and messages
const responsesStatus = require("../enum/responsesStatus");

// Create new Role
const createRole = async (req, res) => {
    // Get all attributes from request to handing it in add function
  const {
    name,
  } = req.body;
  // add Role to db
  try {    
      // if  add new role  to db  
      const role = await Role.create({
      name,
    });
  // if there isn't any error return the result as json response  
    res.status(responsesStatus.OK).json({
      success: true,
      msg: "Role Added  Successfully",
      data: role,
    });
  } catch (error) {
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};
// Get All  Roles
const getAllRoles = async (req, res) => {
// connecting with db for get all roles
  const roles = await Role.find({});
  try {
   // if response from db is ok return the data as formate json
    res.status(responsesStatus.OK).json(roles);
  } catch (error) {
    res.status(responsesStatus.NotFound).json({ error: "Not Found" });
  }
};
// this option exports for i can import in another files 
module.exports = {
    createRole,
    getAllRoles
};
