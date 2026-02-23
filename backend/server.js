const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const seedDoctors = require("./seed");

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ===== TEMP SEED ROUTE (REMOVE AFTER USE) =====
app.get("/seed-production", async (req, res) => {
  try {
    await seedDoctors();
    res.status(200).send("Doctors seeded successfully 🚀");
  } catch (err) {
    console.error(err);
    res.status(500).send("Seeding failed ❌");
  }
});

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.status(200).send("MediCore API is running 🚀");
});

// ===== DATABASE CONNECTION =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
    process.exit(1);
  });