const PurchaseOrder = require("../models/purchaseModel");

// exports.createPurchase = async (req, res) => {
//     try {
//         const newPurchase = new PurchaseOrder(req.body);
//         await newPurchase.save();
//         res.status(201).json(newPurchase);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating purchase order" });
//     }
// };

exports.createPurchase = async (req, res) => {
    try {
        const { supplier, total_amount, status } = req.body;

        if (!supplier || !total_amount || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newPurchase = new PurchaseOrder({ supplier, total_amount, status });
        await newPurchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(500).json({ error: "Error creating purchase order" });
    }
};

exports.getPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseOrder.find().populate("supplier");
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving purchase orders" });
    }
};

exports.updatePurchaseStatus = async (req, res) => {
    try {
        const updatedPurchase = await PurchaseOrder.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedPurchase);
    } catch (error) {
        res.status(500).json({ error: "Error updating purchase order status" });
    }
};
