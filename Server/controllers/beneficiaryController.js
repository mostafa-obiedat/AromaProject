const { Beneficiary, User } = require("../models");
const path = require("path");

exports.uploadFile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) {
      console.log("No file uploaded", req.file); // تحقق من وجود الملف
      return res.status(400).json({ message: "يرجى رفع ملف" });
    }

    const beneficiary = await Beneficiary.create({
      userId,
      filePath: req.file.path,
    });

    res.status(201).json({ message: "تم رفع الملف بنجاح", beneficiary });
  } catch (error) {
    res.status(500).json({ message: "خطأ في رفع الملف", error: error.message });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id);

    if (!beneficiary || !beneficiary.filePath) {
      return res.status(404).json({ message: "لم يتم العثور على الملف" });
    }

    res.sendFile(path.resolve(beneficiary.filePath));
  } catch (error) {
    res
      .status(500)
      .json({ message: "خطأ في تحميل الملف", error: error.message });
  }
};

exports.createBeneficiary = async (data) => {
  try {
    console.log("✅ Received beneficiary data:", data);

    if (!data.userId || !data.universityName) {
      throw new Error("❌ البيانات غير مكتملة");
    }

    const newBeneficiary = await Beneficiary.create({
      userId: data.userId,
      universityName: data.universityName,
      universityNo: data.universityNo || null,
      brothers: data.brothers || null,
      amount: data.amount || 0,
      needsDescription: data.needsDescription || "",
      filePath: data.filePath || null,
    });

    return newBeneficiary;
  } catch (error) {
    console.error("❌ Error saving beneficiary:", error);
    throw error;
  }
};

exports.getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      where: { isDeleted: false },
      include: [
        { model: User, attributes: ["firstName", "lastName", "email"] },
      ],
    });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBeneficiariesWithDeleted = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      include: [
        { model: User, attributes: ["firstName", "lastName", "email"] },
      ],
    });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id);

    if (!beneficiary) {
      return res.status(404).json({ error: "طلب التبرع غير موجود" });
    }

    beneficiary.isDeleted = true;
    await beneficiary.save();

    res.json({ message: "تم حذف طلب التبرع بنجاح (Soft Delete)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.restoreBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id);

    if (!beneficiary) {
      return res.status(404).json({ error: "طلب التبرع غير موجود" });
    }

    beneficiary.isDeleted = false;
    await beneficiary.save();

    res.json({ message: "تم استعادة طلب التبرع بنجاح", beneficiary });
  } catch (error) {
    console.error("Error in uploading file:", error); // إضافة تسجيل الخطأ في السيرفر
    res.status(500).json({ message: "خطأ في رفع الملف", error: error.message });
  }
};
exports.getApprovedBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      where: {
        approvedByAdmin: true, // فقط الطلبات المعتمدة
        isDeleted: false, // فقط الطلبات غير المحذوفة
      },
      attributes: [
        "id",
        "universityName",
        "brothers",
        "amount",
        "needsDescription",
      ], // تحديد الحقول المطلوبة
    });

    res.status(200).json(beneficiaries); // إرسال البيانات كـ JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // إرسال خطأ في حالة فشل الاستعلام
  }
};

// ✅ إضافة دالة getBeneficiaryById
exports.getBeneficiaryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log("Requested Beneficiary ID:", id);

    const beneficiary = await Beneficiary.findOne({
      where: { id, isDeleted: false },
      attributes: [
        "id",
        "universityName",
        "universityNo",
        "amount",
        "needsDescription",
      ],
    });

    if (!beneficiary) {
      console.log("Beneficiary not found");
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    console.log("Beneficiary Found:", beneficiary.toJSON());

    res.json(beneficiary);
  } catch (error) {
    console.error("Error retrieving beneficiary:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.approveBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the beneficiary by ID
    const beneficiary = await Beneficiary.findByPk(id);

    // Check if the beneficiary exists
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    // Update the approvedByAdmin field to true
    beneficiary.approvedByAdmin = true;
    await beneficiary.save();

    // Send a success response
    res
      .status(200)
      .json({ message: "Beneficiary approved successfully", beneficiary });
  } catch (error) {
    // Handle any errors
    res
      .status(500)
      .json({ message: "Error approving beneficiary", error: error.message });
  }
};
