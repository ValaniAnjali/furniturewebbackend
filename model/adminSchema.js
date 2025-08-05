const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of email
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'], // You can define roles and restrict them to specific values
    default: 'admin' // Default role for new admins
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date/time when an admin is created
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
