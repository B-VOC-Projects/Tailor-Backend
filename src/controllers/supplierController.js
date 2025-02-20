const Supplier = require("../models/supplierModel");

// exports.addSupplier = async (req, res) => {
//     try {
//         const newSupplier = new Supplier(req.body);
//         await newSupplier.save();
//         res.status(201).json(newSupplier);
//     } catch (error) {
//         res.status(500).json({ error: "Error adding supplier" });
//     }
// };

exports.addSupplier = async (req, res) => {
    try {
        const { name, contact_info } = req.body;

        if (!name || !contact_info) {
            return res.status(400).json({ error: "Name and contact info are required" });
        }

        const newSupplier = new Supplier({ name, contact_info });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: "Error adding supplier" });
    }
};

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving suppliers" });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: "Error updating supplier" });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting supplier" });
    }
};
