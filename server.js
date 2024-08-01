require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/userRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const customersRoutes = require("./routes/customersRoutes");
const { loginValidator, CustomerValidator } = require("./helper/validator");

// tha main file for work the server 
const PORT = process.env.PORT || 5000;
// express app
const app = express();
const cors = require("cors");
const { loginUser } = require("./controllers/userController");

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "server is running World!" });
});
app.post("/login", loginValidator, loginUser);
app.use("/api/users", usersRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/customers",customersRoutes);

// check if connection db is success the app work and listen on mention port
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("Connecting to db & Listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
