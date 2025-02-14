const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
const Staff = require('../models/staffModel')


exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Try to find the user in the User model
        let user = await User.findById(decoded.id);
        let staff = await Staff.findById(decoded.id);

        if (!user && !staff) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user || staff; // Attach the found user (either staff or user) to the request
        req.role = user ? "user" : "staff"; // Identify whether it's a user or staff

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

exports.authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Get role from user (either staff or regular user)

        
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        next();
    };
};

// Middleware to check if user is Admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
};



