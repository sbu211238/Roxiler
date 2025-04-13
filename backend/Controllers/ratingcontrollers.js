const db = require("../models/db");

exports.addRating = (req, res) => {
  const { user_id, shop_id, rating } = req.body;

  if (
    typeof user_id !== "number" ||
    typeof shop_id !== "number" ||
    typeof rating !== "number" ||
    rating < 1 || rating > 5
  ) {
    return res.status(400).json({ error: "Invalid input. user_id, shop_id, and rating (1-5) are required." });
  }

  // Check if user exists
  const userCheckSql = "SELECT * FROM users WHERE id = ?";
  db.query(userCheckSql, [user_id], (userErr, userResults) => {
    if (userErr) {
      return res.status(500).json({ error: "Error checking user" });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if shop exists
    const shopCheckSql = "SELECT * FROM shops WHERE id = ?";
    db.query(shopCheckSql, [shop_id], (shopErr, shopResults) => {
      if (shopErr) {
        return res.status(500).json({ error: "Error checking shop" });
      }
      if (shopResults.length === 0) {
        return res.status(404).json({ error: "Shop not found" });
      }

      // Finally insert rating
      const insertSql = "INSERT INTO ratings (user_id, shop_id, rating) VALUES (?, ?, ?)";
      db.query(insertSql, [user_id, shop_id, rating], (insertErr, result) => {
        if (insertErr) {
          return res.status(500).json({ error: "Error inserting rating" });
        }
        return res.status(201).json({ message: "Rating added successfully" });
      });
    });
  });
};

exports.getRatingCount = (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM ratings";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching user count:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const shopCount = result[0].count;
    res.status(200).json({ shopCount });
  });
};