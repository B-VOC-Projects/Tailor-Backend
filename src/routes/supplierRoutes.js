const express = require("express");
const router = express.Router();
const { addSupplier, getSuppliers, updateSupplier, deleteSupplier } = require("../controllers/supplierController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");


router.post("/", authMiddleware, authorize(["superadmin", "admin", "owner"]), addSupplier);
router.get("/", authMiddleware, authorize(["superadmin", "admin", "owner"]), getSuppliers);
router.put("/:id", authMiddleware, authorize(["superadmin", "admin", "owner"]), updateSupplier);
router.delete("/:id", authMiddleware, authorize(["superadmin", "admin", "owner"]), deleteSupplier);

module.exports = router;
