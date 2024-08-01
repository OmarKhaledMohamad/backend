
// include the mongo database  library
const mongoose = require("mongoose");
// include validator library for apply validation (third party library)
const {validationResult} = require("express-validator");
// include  User and Role Models 
const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
// library for encrypt password and confirm password
const bcrypt = require("bcrypt"); 
// include  responsesStatus  constant  for status codes  and messages
const responsesStatus = require("../enum/responsesStatus");
// library for generate jwt for login function
const jwt = require("jsonwebtoken"); 

// Get All Users
const getUsers = async (req, res) => {
    // connecting with db for get all users
  const users = await User.find({});
  try {
     // if response from db is ok return the data as formate json
    res.status(responsesStatus.OK).json(users);
  } catch (error) {
    res.status(responsesStatus.NotFound).json({ error: "Not Found" });
  }
};
// Get user By Id
const getUserById = async (req, res) => {
  // get id fro request
    const { id } = req.params;
    try {
     // check if id sended is respect mongo db criteria 
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
      }
    // connecting with db for get user by id
      const user = await User.findById(id);
   // if not object that means the user not found 
      if (!user) {
        res.status(responsesStatus.NotFound).json({ error: "No Such User!" });
      }
      // if user found return the user as formate json
      res.status(responsesStatus.OK).json(user);
    } catch (error) {
      res.status(responsesStatus.BadRequest).json({ error: error.message });
    }
  };
// Create new User
const createUser = async (req, res) => {
// Get all Attributes from request to handing it in add function
  const {
    firstName,
    lastName,
    email,
    roleId,
    password,
    confirmPassword,
  } = req.body;
  // add User to db
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
      // check here if email user is exist or not  
      const isExistUser = await User.findOne({email}) 
     // if exist  return the email is exist error as response
      if(isExistUser){
         return res.status(responsesStatus.BadRequest).json({
           success: false,
           msg: "Email is Exist",
         });
      }
      // encrypt password and confirm password  before save in db with bcrypt library  (third party library)
      const hashedPAssword = await bcrypt.hash(password,5);
      const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 5);
     // if not exist then add new user to db  
      const user = await User.create({
      firstName,
      lastName,
      email,
      roleId,
      password: hashedPAssword,
      confirmPassword: hashedConfirmPassword,
    });
   // if there isn't any error return the result as json response  
    res.status(responsesStatus.OK).json({
      success: true,
      msg: "Added User Successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};
// Delete User
const deleteUser = async (req, res) => {
  // get id from request
  const { id } = req.params;

  try {
     // get id from request url
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    // connecting with db for delete user by id
    const user = await User.findByIdAndDelete({ _id: id });
    // if delete function fall down return as error response
    if (!user) {
      return res
        .status(responsesStatus.NotFound)
        .json({ error: "No Such User!" });
    }
    // return result as json response 
    res.status(responsesStatus.OK).json(user);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
// Generate AccessToken for Login Function 
const generateAccessToken =async (user)=>{
  const token = await jwt.sign(user, process.env.ACCESS_SECRET_TOKEN,{expiresIn:"2h"}); 
  return token
}

// Login Function
const loginUser = async (req, res) => {
  // Get all Attributes from request to handing it in add function
  const {
    email,
    password,
   
  } = req.body;

  // add User to db
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
    // check here if email user is exist or not
    const userData = await User.findOne({ email });
    // if not exist  return the email is exist error as response
    if (!userData) {
      return res.status(responsesStatus.BadRequest).json({
        success: false,
        msg: "Email & Password is incorrect",
      });
    }
    // decode password and compare between sended password and db password 
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    // if not match return error as response
    if (!isPasswordMatch) {
       return res.status(responsesStatus.BadRequest).json({
         success: false,
         msg: "Email & Password is incorrect",
       });
     }
  // Fetch role information from database
    const roleData = await Role.findById(userData.roleId);
    if (!roleData) {
      return res.status(responsesStatus.BadRequest).json({
        success: false,
        msg: "Role information not found",
      });
    }
    // generate token 
    const accessToken = generateAccessToken({user:userData})
    // if there isn't any error return the result as json response  
    return res.status(responsesStatus.OK).json({
         success: true,
         msg: "Login Successfully",
         accessToken: accessToken,
         tokenType: "Bearer",
         data: {
          user: userData,
          role: roleData,
        },
       });
  } catch (error) { 
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};
// this option exports for i can import in another files 
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  loginUser
};
