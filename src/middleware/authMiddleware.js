const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

// Middleware to check if user is Admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
};

exports.authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access Forbidden" });
    }
    next();
};

// exports.authenticateToken = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(403).json({ message: "Access Denied" });
//     try {
//         const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid Token" });
//     }
// };


// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };

