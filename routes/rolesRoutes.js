// import express for router library
const express = require("express");
// import router module for use methods of router
const router = express.Router();
// include all methods from role controller 
const {
    createRole,
    getAllRoles
} = require("../controllers/roleController");

// Define Routes

// get roles route
router.get("/", getAllRoles);
// create role route
router.post("/", createRole);

module.exports = router;
