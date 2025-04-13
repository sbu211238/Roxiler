// controllers/shopControllers.js
const db = require("../models/db");

exports.getShops = (req, res) => {
  const sql = "SELECT * FROM shops";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to fetch shops:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ shops: results });
  });
};
// Add this function below getShops
exports.addShop = (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: "Name and location are required" });
  }

  const sql = "INSERT INTO shops (name, location) VALUES (?, ?)";
  db.query(sql, [name, location], (err, result) => {
    if (err) {
      console.error("Failed to insert shop:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ message: "Shop added successfully", shop_id: result.insertId });
  });
};


exports.getShopCount = (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM shops";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching shop count:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const shopCount = result[0].count;
    res.status(200).json({ shopCount });
  });
};

// Search stores by name or address


exports.searchShop = (req, res) => {
  const { name, location } = req.query;

  console.log("Search parameters:", name, location); // debug input

  const sql = `SELECT * FROM shops WHERE name LIKE ? OR location LIKE ?`;
  const values = [`%${name || ""}%`, `%${location || ""}%`];

  db.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Search error:", err.message);
      return res.status(500).json({ error: "Server error while searching." });
    }

    res.json({ results: rows });
  });
};

exports.getShopListings = (req, res) => {
  const userId = req.query.userId; // Pass userId in query (or from auth middleware)

  const sql = `
    SELECT 
      s.id AS shop_id,
      s.name,
      s.location,
      ROUND(AVG(r.rating), 1) AS overall_rating,
      ur.rating AS user_rating
    FROM shops s
    LEFT JOIN ratings r ON s.id = r.shop_id
    LEFT JOIN ratings ur ON s.id = ur.shop_id AND ur.user_id = ?
    GROUP BY s.id
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching shop listings:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ shops: results });
  });
};

exports.submitRating = (req, res) => {
  const { userId, shopId, rating } = req.body;

  const checkSql = `SELECT * FROM ratings WHERE user_id = ? AND shop_id = ?`;
  db.query(checkSql, [userId, shopId], (err, results) => {
    if (err) {
      console.error("Error checking existing rating:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }

    if (results.length > 0) {
      // Update existing
      const updateSql = `UPDATE ratings SET rating = ? WHERE user_id = ? AND shop_id = ?`;
      db.query(updateSql, [rating, userId, shopId], (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update rating" });
        }
        res.json({ message: "Rating updated successfully" });
      });
    } else {
      // Insert new
      const insertSql = `INSERT INTO ratings (user_id, shop_id, rating) VALUES (?, ?, ?)`;
      db.query(insertSql, [userId, shopId, rating], (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to submit rating" });
        }
        res.json({ message: "Rating submitted successfully" });
      });
    }
  });
};


