const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const seedDoctors = require("./seed");

const app = express();

// =============================
// MIDDLEWARE
// =============================
app.use(express.json());

// =============================
// CORS FIX (FINAL VERSION)
// =============================
const allowedOrigins = [
  process.env.FRONTEND_URL, // your main Vercel URL
  "http://localhost:5173",  // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      // Allow main frontend URL
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow ALL Vercel preview deployments
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// =============================
// ROUTES
// =============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.status(200).send("MediCore API is running 🚀");
});

// =============================
// DATABASE CONNECTION
// =============================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected ✅");

    // Seed doctors if not already seeded
    await seedDoctors();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
    process.exit(1);
  });