const express = require("express");
const router = express.Router();
const { createPurchase, getPurchases, updatePurchaseStatus } = require("../controllers/purchaseController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");


router.post("/",authMiddleware, authorize(["superadmin", "admin","owner"]), createPurchase);
router.get("/",authMiddleware, authorize(["superadmin", "admin","owner"]), getPurchases);
router.put("/:id/status",authMiddleware, authorize(["superadmin", "admin","owner"]), updatePurchaseStatus);

module.exports = router;
