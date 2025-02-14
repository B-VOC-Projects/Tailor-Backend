const express = require("express");
const { addMeasurement, getMeasurementsById, getMeasurements, updateMeasurement, deleteMeasurement } = require("../controllers/measurementController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, authorize(["staff", "admin","Tailor"]), addMeasurement);
router.get("/", authMiddleware, authorize(["staff", "admin","Tailor"]), getMeasurements);
router.get("/:customerId", authMiddleware, authorize(["staff", "admin","Tailor"]), getMeasurementsById);
router.put("/:id", authMiddleware, authorize(["staff", "admin","Tailor"]), updateMeasurement);
router.delete("/:id", authMiddleware, authorize(["admin"]), deleteMeasurement);

module.exports = router;
