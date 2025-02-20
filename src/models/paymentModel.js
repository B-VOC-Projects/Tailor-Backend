const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
    payment_date: { type: Date, default: Date.now },
    amount_paid: { type: Number, required: true },
    payment_method: { type: String, required: true },
},{ timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
