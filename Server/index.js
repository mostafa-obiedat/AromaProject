const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const contactMessagesRoutes = require("./routes/contactMessagesRoutes");
const donorRoutes = require("./routes/donorRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const donatioinRoutes = require("./routes/donationRoutes")


dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173 ", // حدد عنوان الواجهة الأمامية
    credentials: true, // السماح بإرسال ملفات تعريف الارتباط (cookies)
  })
);
app.use(express.json());
// إعداد الـ Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// إعداد مسار لتخزين الملفات
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", contactMessagesRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/case", beneficiaryRoutes);
app.use("/api", donatioinRoutes);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
