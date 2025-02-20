const express = require("express");
const router = express.Router();
const { createInvoice, getInvoices, updateInvoiceStatus } = require("../controllers/invoiceController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");

router.post("/",authMiddleware, authorize(["superadmin", "admin","owner"]), createInvoice);
router.get("/", authMiddleware, authorize(["superadmin", "admin","owner"]),getInvoices);
router.put("/:id/status", authMiddleware, authorize(["superadmin", "admin","owner"]), updateInvoiceStatus);

module.exports = router;
