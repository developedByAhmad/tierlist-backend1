const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/auth');

const userController = require('../controllers/userRankings');
router.get("/get/:id", checkAuth,userController.get)
router.patch("/update", checkAuth, userController.update)


module.exports = router;