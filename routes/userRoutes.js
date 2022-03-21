const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

// Register user
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);
// Get user
router.get("/user", auth, getUser);

module.exports = router;
