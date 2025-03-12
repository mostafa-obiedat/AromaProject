const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationControllers");
const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/payment", authenticateUser, donationController.createDonation);
router.put("/status", donationController.updateDonationStatus);

module.exports = router;
