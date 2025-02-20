const Invoice = require("../models/invoiceModel");

// exports.createInvoice = async (req, res) => {
//     try {
//         const newInvoice = new Invoice(req.body);
//         await newInvoice.save();
//         res.status(201).json(newInvoice);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating invoice" });
//     }
// };

exports.createInvoice = async (req, res) => {
    try {
        const { order, customer, total_amount, status } = req.body;

        if (!order || !customer || !total_amount || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newInvoice = new Invoice({ order, customer, total_amount, status });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: "Error creating invoice" });
    }
};


exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("order customer");
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: "Error fetching invoices" });
    }
};

exports.updateInvoiceStatus = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ error: "Error updating invoice status" });
    }
};
