const Shop = require("../models/shopModel");

// Create Shop
exports.createShop = async (req, res) => {
    try {
        const shopData = new Shop(req.body);
        const savedShop = await shopData.save();
        res.status(201).json(savedShop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate("user_id");
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Shop by ID
exports.getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate("user_id");
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Shop
exports.updateShop = async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Shop
exports.deleteShop = async (req, res) => {
    try {
        await Shop.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
