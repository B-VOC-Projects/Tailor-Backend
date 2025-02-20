const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({
    order_date: { type: Date, default: Date.now },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    status: { type: String, enum: ["pending", "received"], default: "pending" },
},{ timestamps: true });

module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
