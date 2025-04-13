const express = require("express");
const router = express.Router();
const { loginUser, updatePassword, registerUser, getUserCount } = require("../Controllers/authControllers");

router.post("/register" , registerUser); 
router.post("/login", loginUser);
router.post("/update-password", updatePassword);
router.get("/get-user", getUserCount);

module.exports = router;