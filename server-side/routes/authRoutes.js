const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) =>
  res.json({ message: "Welcome Admin" })
);

module.exports = router;
