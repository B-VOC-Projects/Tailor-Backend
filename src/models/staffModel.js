const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["MasterTailor", "Tailor", "Helper"], default: "Tailor" },
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
