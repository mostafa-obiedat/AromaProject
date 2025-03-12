const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  replyToMessage,
  addContactMessage,
} = require("../controllers/ContactMessageController");

router.get("/contact-messages", getAllMessages);

router.post("/contact-messages/reply", replyToMessage);

router.post("/add-contact", addContactMessage);

module.exports = router;

