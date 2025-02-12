const express = require("express");
const { createStaff, getAllStaff, resetStaffPassword, deleteStaff } = require("../controllers/adminController.js");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-staff", authMiddleware, isAdmin, createStaff);
router.get("/staff", authMiddleware, isAdmin, getAllStaff);
router.put("/staff/reset-password/:id", authMiddleware, isAdmin, resetStaffPassword);
router.delete("/staff/:id", authMiddleware, isAdmin, deleteStaff);

module.exports = router;
