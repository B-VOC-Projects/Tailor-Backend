const mongoose = require("mongoose");


const InvoiceSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
},{ timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSchema);
