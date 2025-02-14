const express = require("express");
const { sendStatusEmail, sendOrderUpdateEmail  } = require("../controllers/emailController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send-email", authMiddleware, authorize(["admin", "staff","Tailor"]), sendStatusEmail);
router.post("/send-email-order-update", authMiddleware, authorize(["admin", "staff","Tailor"]), sendOrderUpdateEmail);

module.exports = router;
