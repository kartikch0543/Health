const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const doctors = [
  { name: "Dr. Aarav Mehta", email: "aarav.mehta@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Emily Carter", email: "emily.carter@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Rohan Gupta", email: "rohan.gupta@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Riya Sharma", email: "riya.sharma@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Chloe Davis", email: "chloe.davis@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Vikram Singh", email: "vikram.singh@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Ananya Iyer", email: "ananya.iyer@medcore.in", specialization: "Neurologist" },
  { name: "Dr. James Wilson", email: "james.wilson@medcore.in", specialization: "Neurologist" },
  { name: "Dr. Priya Patel", email: "priya.patel@medcore.in", specialization: "Neurologist" }
];

const seedDoctors = async () => {
  try {
    const existingDoctors = await User.find({ role: "doctor" });

    if (existingDoctors.length > 0) {
      console.log("Doctors already seeded ✅");
      return;
    }

    for (const doc of doctors) {
      const hashedPassword = await bcrypt.hash("password123", 10);

      await User.create({
        name: doc.name,
        email: doc.email,
        password: hashedPassword,
        role: "doctor",
        specialization: doc.specialization
      });
    }

    console.log("Doctors seeded successfully 🚀");
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

module.exports = seedDoctors;