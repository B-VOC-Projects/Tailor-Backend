const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    category: { type: String, enum: ["Shirt", "Kurta", "Pant"], required: true },
    measurements: { type: Object, required: true }
},{ timestamps: true });

module.exports = mongoose.model("Measurement", measurementSchema);
