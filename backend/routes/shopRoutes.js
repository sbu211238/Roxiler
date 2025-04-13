const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopControllers");

router.get("/", shopController.getShops);

// Add this POST route:
router.post("/", shopController.addShop);
router.get("/shop-count", shopController.getShopCount);
router.get("/search",shopController.searchShop);
router.get("/listings", shopController.getShopListings);
router.post("/rate", shopController.submitRating);


module.exports = router;