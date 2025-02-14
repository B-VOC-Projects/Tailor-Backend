const Measurement = require("../models/measurementModel");

// Add a new measurement
exports.addMeasurement = async (req, res) => {
    try {
        const { customerId, category, measurements } = req.body;
        const staffId = req.user.id; 

        const newMeasurement = new Measurement({
            staffId,
            customerId,
            category,
            measurements
        });

        await newMeasurement.save();
        res.status(201).json({ message: "Measurement added successfully", measurement: newMeasurement });
    } catch (error) {
        res.status(500).json({ message: "Error adding measurement", error: error.message });
    }
};

// Get all measurements for a customer
exports.getMeasurements = async (req, res) => {
    try {
        // const { customerId } = req.params;
        // const measurements = await Measurement.find({ customerId });
        const measurements = await Measurement.find();

        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching measurements", error: error.message });
    }
};

exports.getMeasurementsById = async (req, res) => {
    try {
        const { customerId } = req.params;
        const measurements = await Measurement.findById(customerId);

        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching measurements", error: error.message });
    }
};
// Update measurement
exports.updateMeasurement = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedMeasurement = await Measurement.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedMeasurement) {
            return res.status(404).json({ message: "Measurement not found" });
        }

        res.status(200).json({ message: "Measurement updated successfully", measurement: updatedMeasurement });
    } catch (error) {
        res.status(500).json({ message: "Error updating measurement", error: error.message });
    }
};

// Delete measurement
exports.deleteMeasurement = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMeasurement = await Measurement.findByIdAndDelete(id);

        if (!deletedMeasurement) {
            return res.status(404).json({ message: "Measurement not found" });
        }

        res.status(200).json({ message: "Measurement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting measurement", error: error.message });
    }
};
