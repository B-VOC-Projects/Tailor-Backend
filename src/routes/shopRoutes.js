const express = require("express");
const router = express.Router();
const { createShop, getAllShops, getShopById, updateShop, deleteShop } = require("../controllers/shopController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorize(["superadmin", "admin", "owner"]), createShop);
router.get("/", authMiddleware, authorize(["superadmin", "admin", "owner"]), getAllShops);
router.get("/:id", authMiddleware, authorize(["superadmin", "admin", "owner"]), getShopById);
router.put("/:id", authMiddleware, authorize(["superadmin", "admin", "owner"]), updateShop);
router.delete("/:id", authMiddleware, authorize(["superadmin", "admin", "owner"]), deleteShop);

module.exports = router;