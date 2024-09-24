const express = require("express");
const { updateProfile, getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

module.exports = router;
