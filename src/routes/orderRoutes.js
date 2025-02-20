const express = require("express");
const router = express.Router();
const { createOrder, updateOrderStatus, getOrders } = require("../controllers/orderController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorize(["superadmin", "admin","owner"]), createOrder);
router.put("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), updateOrderStatus);
router.get("/", authMiddleware, authorize(["superadmin", "admin","owner"]),getOrders);

module.exports = router;
