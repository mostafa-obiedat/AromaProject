const { User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

require("dotenv").config();

// إنشاء حساب مستخدم جديد مع تشفير كلمة المرور وإنشاء JWT Token
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, status, phoneNumber, address } = req.body;

    // التحقق من وجود البريد الإلكتروني مسبقًا
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      status,
      phoneNumber,
      address,
    });

    // إنشاء JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // صلاحية التوكن 7 أيام
    );

    // تخزين التوكن في الكوكيز
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // أمان أكثر في الإنتاج
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
    });

    return res.status(201).json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// تسجيل الدخول وإنشاء JWT Token وتخزينه في الكوكيز
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود المستخدم
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // مقارنة كلمة المرور المشفرة
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // إنشاء JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // تخزين التوكن في الكوكيز
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ 
      message: "Login successful", 
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, 
      token 
    });
    
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// تسجيل خروج المستخدم عن طريق حذف التوكن من الكوكيز
const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

// الحصول على الملف الشخصي للمستخدم
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // استبعاد كلمة المرور من البيانات
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// تحديث بيانات المستخدم
const updateProfile = async (req, res) => {
  const { firstName, lastName, phoneNumber, address } = req.body;

  try {
    // التحقق من التوكن وفك تشفيره للحصول على معرف المستخدم
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Please log in first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // العثور على المستخدم وتحديث بياناته
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // تحديث بيانات المستخدم في قاعدة البيانات
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getUsersExcludingAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Sequelize.Op.ne]: "admin",
        },
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserStatus = async (req, res) => {
  const { userId, status } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validStatuses = ["pending", "approved", "inactive"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    user.status = status;
    await user.save();

    await sendStatusUpdateEmail(user.email, status);

    return res.status(200).json({
      message: `User status updated to ${status} and email sent.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendStatusUpdateEmail = async (userEmail, status) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Account Status Update",
    text: `Dear user,\n\nYour account status has been updated to: ${status}.\n\nThank you for being with us.`, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Status update email sent.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await User.count({
      where: {
        role: {
          [Sequelize.Op.ne]: "admin",
        },
      },
    });

    return res.status(200).json({ count: userCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsersExcludingAdmin,
  updateUserStatus,
  loginUser,
  logoutUser,
  getProfile,
  getUserCount,
  createUser,
  updateProfile
};