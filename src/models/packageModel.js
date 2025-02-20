const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    interval: { type: String, enum: ["monthly", "yearly","one-time"], default: "one-time",required: true },
    staff_limit: { type: Number, required: true },
    customer_limit: { type: Number, required: true },
    catalog_limit: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Package", PackageSchema);
