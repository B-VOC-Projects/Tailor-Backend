const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const customerRoutes = require("./routes/customerRoutes");
const emailRoutes = require("./routes/emailRoutes")
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const packageRoutes = require("./routes/packageRoutes");
const shopRoutes = require("./routes/shopRoutes");


// const { authMiddleware, authorizeRole } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/measurements", measurementRoutes);
app.use("/api/customers", customerRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/email",emailRoutes)


// app.get("/api/admin/dashboard",authMiddleware , authorizeRole("admin"), (req, res) => {
//   res.json({ message: "Welcome Admin!" });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
