const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const { authenticateAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/admin/login", adminLogin);
router.get("/dashboard", authenticateAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard", user: req.user });
});
module.exports = router;
