const Order = require("../models/orderModel");
const sendEmail = require("../utils/emailService");

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Error creating order" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("customer");

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Send email notification
        const emailContent = `
            <html>
            <body>
                <h2>Your Order Status Update</h2>
                <p>Hello ${order.customer.name},</p>
                <p>Your order status has been updated to <strong>${status}</strong>.</p>
                <p>Thank you for choosing BVoc Tailor Shop.</p>
            </body>
            </html>
        `;

        await sendEmail(order.customer.email, "Order Status Update", emailContent);

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Error updating order status" });
    }
};

// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

//         if (!order) return res.status(404).json({ message: "Order not found" });

//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ error: "Error updating order status" });
//     }
// };

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("customer assigned_to");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving orders" });
    }
};


