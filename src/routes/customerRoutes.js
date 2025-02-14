const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorize(["staff", "admin","Tailor"]), createCustomer);
router.get("/", authMiddleware, authorize(["staff", "admin"]), getAllCustomers);
router.get("/:id", authMiddleware, authorize(["staff", "admin"]), getCustomerById);
router.put("/:id", authMiddleware, authorize(["staff", "admin"]), updateCustomer);
router.delete("/:id", authMiddleware, authorize(["admin"]), deleteCustomer);

module.exports = router;
