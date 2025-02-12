const bcrypt = require("bcryptjs");
const Staff = require("../models/staffModel");

// Create Staff and Return Username & Password
const createStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) return res.status(400).json({ message: "Staff already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await Staff.create({ name, email, password: hashedPassword, role });

        res.status(201).json({
            message: "Staff created successfully",
            staff: {
                id: newStaff._id,
                name: newStaff.name,
                email: newStaff.email,
                password, // Show only when created
                role: newStaff.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Staff (Show Password Placeholder)
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find().select("-password"); // Do not return hashed passwords
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset Staff Password (Admin Only)
const resetStaffPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedStaff = await Staff.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedStaff) return res.status(404).json({ message: "Staff not found" });

        res.status(200).json({
            message: "Password reset successfully",
            staff: {
                id: updatedStaff._id,
                name: updatedStaff.name,
                email: updatedStaff.email,
                password: newPassword, // Show only once after reset
                role: updatedStaff.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Staff
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStaff = await Staff.findByIdAndDelete(id);
        if (!deletedStaff) return res.status(404).json({ message: "Staff not found" });

        res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createStaff, getAllStaff, resetStaffPassword, deleteStaff };
