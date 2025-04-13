// routes/ratingRoutes.js
const express = require("express");
const router = express.Router();
const { addRating, getRatingCount } = require("../Controllers/ratingControllers");
router.post("/add", addRating);
router.get("/get-rating",getRatingCount);

module.exports = router;
