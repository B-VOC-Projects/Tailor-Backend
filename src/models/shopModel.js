const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    customer_care: { type: String, required: true },
    shop_address: { type: String, required: true },
    free_delivery: { type: Boolean, default: false },
    status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Shop", ShopSchema);
