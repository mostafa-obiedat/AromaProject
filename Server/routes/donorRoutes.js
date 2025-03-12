const express = require("express");
const {   getUserDonations, getUserTotalDonations,   getUserAverageDonation,  updateDonor,  getDonorProfile, } = require("../controllers/donorController");
    // const { authenticateUser } = require("../middleware/authMiddleware");
    const router = express.Router();
 

// استرجاع تبرعات المستخدم الحالي
router.get("/donations/:id", getUserDonations);
router.get("/donations/total/:id", getUserTotalDonations);
router.get("/donations/average/:id", getUserAverageDonation);
router.put("/update-profile/:id", updateDonor);
router.get("/profile/:id", getDonorProfile);

module.exports = router;




// const express = require("express");
// const {   getUserDonations,
//     getUserTotalDonations,
//     getUserAverageDonation,
//     updateDonor, } = require("../controllers/donorController");
//     // const { authenticateUser } = require("../middleware/authMiddleware");
//     const router = express.Router();


// // استرجاع تبرعات المستخدم الحالي
// router.get("/donations/:id", getUserDonations);
// // GET /api/donors/donations	
// // حساب إجمالي تبرعات المستخدم الحالي
// router.get("/donations/total", getUserTotalDonations);
// // GET /api/donors/donations/total	
// // حساب متوسط التبرعات
// router.get("/donations/average", getUserAverageDonation);
// // GET /api/donors/donations/average	
// // تحديث بيانات المتبرع
// router.put("/update-profile", updateDonor);
// // PUT /api/donors/update-profile	
// module.exports = router;





// رح احتاجو في الموديل  
// middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // يفترض أن التوكن يُرسل مع header Authorization كـ "Bearer <token>"
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // decoded يجب أن يحتوي على معرف المستخدم (مثل id)
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = { authenticateUser };