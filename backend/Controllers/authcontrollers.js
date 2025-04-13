const db = require("../models/db"); // this connects to your MySQL

exports.registerUser = (req, res) => {
  console.log("✅ registerUser route hit");

  const { username, email, password, address } = req.body;

  if (!username || !email || !password || !address) {
    console.log("❌ Missing fields:", req.body);
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO users (username, email, password, address) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, password, address], (err, result) => {
    if (err) {
      console.error("❌ Registration failed:", err);
      return res.status(500).json({ error: "Database error during registration" });
    }
    console.log("✅ User inserted with ID:", result.insertId);
    res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  });
};

exports.loginUser = (req, res) => {
  console.log("api hit");
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login failed:", err);
      return res.status(500).json({ error: "Database error during login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: results[0] });
  });
};
// userController.js

exports.updatePassword = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Step 1: Verify current password
  const checkSql = "SELECT password FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (results[0].password !== currentPassword) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    // Step 2: Update new password
    const updateSql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(updateSql, [newPassword, email], (err, updateResult) => {
      if (err) {
        console.error("Password update failed:", err);
        return res.status(500).json({ error: "Database error during update" });
      }
      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

exports.getUserCount = (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching user count:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const shopCount = result[0].count;
    res.status(200).json({ shopCount });
  });
};