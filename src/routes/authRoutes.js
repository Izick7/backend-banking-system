const express = require("express");
const { login, register } = require("../controllers/authController");
const { getBalance } = require("../controllers/accountController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/balance", authenticate, getBalance);


module.exports = router;