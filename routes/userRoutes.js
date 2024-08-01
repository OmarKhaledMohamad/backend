// import express for router library
const express = require("express");
// import router module for use methods of router
const router = express.Router();
// import user validator
const { registerValidator } = require("../helper/validator");
// include all methods from user controller 
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  loginUser
} = require("../controllers/userController");
// Get All Users route
router.get("/", getUsers);
// Get Single User route
router.get("/:id", getUserById);

// Create a new User route
router.post("/", registerValidator, createUser);
// Delete User route
router.delete("/:id", deleteUser);
module.exports = router;
