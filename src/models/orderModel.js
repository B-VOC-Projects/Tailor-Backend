const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Staff assigned
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
    estimated_completion: { type: Date },
},{ timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
