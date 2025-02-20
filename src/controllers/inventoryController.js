const Inventory = require("../models/inventoryModel");

// exports.addInventory = async (req, res) => {
//     try {
//         const newInventory = new Inventory(req.body);
//         await newInventory.save();
//         res.status(201).json(newInventory);
//     } catch (error) {
//         res.status(500).json({ error: "Error adding inventory" });
//     }
// };
exports.addInventory = async (req, res) => {
    try {
        const { item_name, quantity, price, supplier } = req.body;
        
        if (!item_name || !quantity || !price || !supplier) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newInventory = new Inventory({ item_name, quantity, price, supplier });
        await newInventory.save();
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: "Error adding inventory" });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate("supplier");
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: "Error fetching inventory" });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: "Error updating inventory" });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting inventory" });
    }
};
