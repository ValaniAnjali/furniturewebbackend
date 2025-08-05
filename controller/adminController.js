const Admin = require("../model/adminSchema");

// Controller function to add a new admin
const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin with the provided email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Create a new admin instance
    const newAdmin = new Admin({
      email,
      password
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ message: "Failed to add admin" });
  }
};

module.exports = { addAdmin };
