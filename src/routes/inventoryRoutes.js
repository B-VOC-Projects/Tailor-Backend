const express = require("express");
const router = express.Router();
const { addInventory, getInventory, updateInventory, deleteInventory } = require("../controllers/inventoryController");
const { authMiddleware , authorize} = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorize(["superadmin", "admin","owner"]), addInventory);
router.get("/",  authMiddleware, authorize(["superadmin", "admin","owner"]), getInventory);
router.put("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), updateInventory);
router.delete("/:id",authMiddleware, authorize(["superadmin", "admin","owner"]), deleteInventory);

module.exports = router;
