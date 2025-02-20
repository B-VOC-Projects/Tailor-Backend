const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // Foreign Key
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);
