const express = require("express");
const router = express.Router();
const { makePayment, getPayments } = require("../controllers/paymentController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");


router.post("/",authMiddleware, authorize(["superadmin", "admin","owner"]), makePayment);
router.get("/", authMiddleware, authorize(["superadmin", "admin","owner"]), getPayments);

module.exports = router;
