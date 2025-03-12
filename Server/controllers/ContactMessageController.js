const { ContactMessage } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();

    if (!messages.length) {
      return res.status(404).json({ message: "No contact messages found" });
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const replyToMessage = async (req, res) => {
  const { email, replyMessage } = req.body;

  if (!email || !replyMessage) {
    return res
      .status(400)
      .json({ message: "Email and reply message are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reply to Your Contact Message",
    text: replyMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error sending reply:", error);
    return res.status(500).json({ message: "Error sending reply email" });
  }
};

const addContactMessage = async (req, res) => {
  const { name, email, description } = req.body;

  if (!name || !email || !description) {
    return res
      .status(400)
      .json({ description: "Name, email, and message are required" });
  }

  try {
    const newMessage = await ContactMessage.create({
      name,
      email,
      description,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Your Message",
      text: "Thank you for reaching out to us. We have received your message and will get back to you shortly.",
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ description: "Contact message added successfully", newMessage });
  } catch (error) {
    console.error("Error adding contact message:", error);
    return res.status(500).json({ description: "Internal server error" });
  }
};

module.exports = {
  getAllMessages,
  replyToMessage,
  addContactMessage,
};
