const express = require("express");
const userController = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.authUser);
router.route("/profile").post(protect, userController.updateUserProfile);

module.exports = router;
