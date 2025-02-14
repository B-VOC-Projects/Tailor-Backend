const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    details: String,
});

module.exports = mongoose.model('Order', orderSchema);
