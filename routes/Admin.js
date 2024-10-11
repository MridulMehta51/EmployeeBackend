const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new admin
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newAdmin = new Admin({ name, email, password });
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
