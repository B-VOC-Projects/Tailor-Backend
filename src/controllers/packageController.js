const Package = require("../models/packageModel");

// Create Package
exports.createPackage = async (req, res) => {
    try {
        const packageData = new Package(req.body);
        const savedPackage = await packageData.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Packages with Optional Filtering
exports.getAllPackages = async (req, res) => {
    try {
        const { filter } = req.query;
        let query = {};

        if (filter) {
            query = {
                $or: [
                    { title: { $regex: filter, $options: "i" } },  // Search in title
                    { price: { $regex: filter, $options: "i" } },  // Search in price
                    { interval: { $regex: filter, $options: "i" } } // Search in interval
                ]
            };
        }

        // Fetch all packages if no filter, otherwise apply query
        const packages = await Package.find(query);
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Packages
// exports.getAllPackages = async (req, res) => {
//     try {
//         const packages = await Package.find();
//         res.status(200).json(packages);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Get Package by ID
exports.getPackageById = async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id);
        if (!packageData) return res.status(404).json({ message: "Package not found" });
        res.status(200).json(packageData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Package
exports.updatePackage = async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Package
exports.deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
