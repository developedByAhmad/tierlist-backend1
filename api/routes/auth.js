const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/auth');
const authController = require('../controllers/auth');
router.post("/signup", authController.signup)
router.post("/login",  checkAuth,authController.login)


module.exports = router;