const express = require("express");
const router = express.Router();
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require("../controllers/packageController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");

router.post("/",authMiddleware, authorize(["superadmin", "admin","owner"]), createPackage);
router.get("/", authMiddleware, authorize(["superadmin", "admin","owner"]),getAllPackages);
router.get("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), getPackageById);
router.put("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), updatePackage);
router.delete("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), deletePackage);


module.exports = router;