const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getFile,
  createBeneficiary,
  getAllBeneficiaries,
  getAllBeneficiariesWithDeleted,
  deleteBeneficiary,
  restoreBeneficiary,
  approveBeneficiary,
  getApprovedBeneficiaries,
  getBeneficiaryById,
} = require("../controllers/beneficiaryController");

// إعداد `multer` لتخزين الملفات داخل مجلد `uploads/`
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// السماح فقط بملفات الصور و PDF
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("فقط ملفات PDF أو الصور مسموحة"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

// رفع ملف مع البيانات النصية
router.post("/beneficiary", upload.single("file"), async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    const newBeneficiary = await createBeneficiary({
      ...req.body,
      filePath: req.file ? req.file.path : null,
    });

    res
      .status(201)
      .json({ message: "تم إرسال الطلب بنجاح", data: newBeneficiary });
  } catch (error) {
    console.error("Error creating beneficiary:", error);
    res
      .status(500)
      .json({ message: "خطأ داخلي في الخادم", error: error.message });
  }
});

// عرض الملف بناءً على ID المستخدم
router.get("/file/:id", getFile);

// جلب جميع طلبات التبرع غير المحذوفة
router.get("/beneficiaries", getAllBeneficiaries);

// جلب جميع طلبات التبرع (بما في ذلك المحذوفة)
router.get("/api/beneficiaries/all", getAllBeneficiariesWithDeleted);

// حذف طلب تبرع (Soft Delete)
router.delete("/api/beneficiaries/:id", deleteBeneficiary);

// استعادة طلب تبرع محذوف
router.post("/api/beneficiaries/restore/:id", restoreBeneficiary);

router.put("/beneficiaries/:id/approve", approveBeneficiary);

// جلب الطلبات المعتمدة
router.get("/approved", getApprovedBeneficiaries);
router.get("/api/beneficiaries/:id", getBeneficiaryById);
module.exports = router;
