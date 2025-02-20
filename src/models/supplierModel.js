const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gst_no: { type: String, required: true },
},{ timestamps: true });

module.exports = mongoose.model("Supplier", SupplierSchema);
