const User = require("./models/User");

const doctors = [
  { name: "Dr. Aarav Mehta", email: "aarav.mehta@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Emily Carter", email: "emily.carter@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Rohan Gupta", email: "rohan.gupta@medcore.in", specialization: "Cardiologist" },
  { name: "Dr. Riya Sharma", email: "riya.sharma@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Chloe Davis", email: "chloe.davis@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Vikram Singh", email: "vikram.singh@medcore.in", specialization: "Dermatologist" },
  { name: "Dr. Ananya Iyer", email: "ananya.iyer@medcore.in", specialization: "Neurologist" },
  { name: "Dr. James Wilson", email: "james.wilson@medcore.in", specialization: "Neurologist" },
  { name: "Dr. Priya Patel", email: "priya.patel@medcore.in", specialization: "Neurologist" },
  { name: "Dr. Kabir Malhotra", email: "kabir.malhotra@medcore.in", specialization: "Orthopedic Surgeon" },
  { name: "Dr. Michael Brown", email: "michael.brown@medcore.in", specialization: "Orthopedic Surgeon" },
  { name: "Dr. Arjun Reddy", email: "arjun.reddy@medcore.in", specialization: "Orthopedic Surgeon" },
  { name: "Dr. Vivaan Kapoor", email: "vivaan.kapoor@medcore.in", specialization: "Pediatrician" },
  { name: "Dr. Sarah Johnson", email: "sarah.johnson@medcore.in", specialization: "Pediatrician" },
  { name: "Dr. Neha Verma", email: "neha.verma@medcore.in", specialization: "Pediatrician" },
  { name: "Dr. Meera Nair", email: "meera.nair@medcore.in", specialization: "Gynecologist" },
  { name: "Dr. Laura Martinez", email: "laura.martinez@medcore.in", specialization: "Gynecologist" },
  { name: "Dr. Sanya Khan", email: "sanya.khan@medcore.in", specialization: "Gynecologist" },
  { name: "Dr. Arjun Desai", email: "arjun.desai@medcore.in", specialization: "General Physician" },
  { name: "Dr. Robert Smith", email: "robert.smith@medcore.in", specialization: "General Physician" },
  { name: "Dr. Kavita Joshi", email: "kavita.joshi@medcore.in", specialization: "General Physician" }
];

const seedDoctors = async () => {
  try {
    const existingDoctors = await User.find({ role: "doctor" });

    if (existingDoctors.length > 0) {
      console.log("Doctors already exist ✅");
      return;
    }

    for (const doc of doctors) {
      await User.create({
        name: doc.name,
        email: doc.email,
        password: "password123", // plain text (model will hash)
        role: "doctor",
        specialization: doc.specialization
      });
    }

    console.log("Doctors seeded successfully 🚀");
  } catch (err) {
    console.error("Seeding error ❌", err);
  }
};

module.exports = seedDoctors;