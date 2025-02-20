const Payment = require("../models/paymentModel");

// exports.makePayment = async (req, res) => {
//     try {
//         const newPayment = new Payment(req.body);
//         await newPayment.save();
//         res.status(201).json(newPayment);
//     } catch (error) {
//         res.status(500).json({ error: "Error processing payment" });
//     }
// };

exports.makePayment = async (req, res) => {
    try {
        const { order, customer, amount, payment_method, status } = req.body;

        if (!order || !customer || !amount || !payment_method || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newPayment = new Payment({ order, customer, amount, payment_method, status });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: "Error processing payment" });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("order customer");
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving payments" });
    }
};
