const { Donation } = require("../models");

const createDonation = async (req, res) => {
    try {
        const { amount, currency, programId } = req.body;
        const donorId = req.user.id; 

        if (!amount || !currency || !programId) {
            return res.status(400).json({ error: "جميع الحقول مطلوبة" });
        }

        const donation = await Donation.create({
            donorId,
            amount,
            currency,
            donationDate: new Date(),
            programId,
            receiptGenerated: false,
            status: "pending"
        });

        res.status(201).json({ message: "تم إنشاء التبرع بنجاح، انتظر تأكيد الدفع", donation });
    } catch (error) {
        console.error("خطأ في إنشاء التبرع:", error);
        res.status(500).json({ error: "حدث خطأ داخلي" });
    }
};

//(Stripe, PayPal Webhook)
const updateDonationStatus = async (req, res) => {
    try {
        const { donationId, status } = req.body; 

        const donation = await Donation.findByPk(donationId);
        if (!donation) {
            return res.status(404).json({ error: "لم يتم العثور على التبرع" });
        }

        if (donation.status !== "pending") {
            return res.status(400).json({ error: "لا يمكن تحديث تبرع مكتمل بالفعل" });
        }

        donation.status = status; // "completed" / "failed"
        await donation.save();

        res.status(200).json({ message: "تم تحديث حالة التبرع", donation });
    } catch (error) {
        console.error("خطأ في تحديث التبرع:", error);
        res.status(500).json({ error: "حدث خطأ داخلي" });
    }
};


module.exports = {
    createDonation,
    updateDonationStatus
};