const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/auth');

const adminRankingController = require('../controllers/adminRankings');
router.get("/get", checkAuth,adminRankingController.get)
router.patch("/update", checkAuth,adminRankingController.update)
router.post("/update-new", checkAuth,adminRankingController.updateNew)


module.exports = router;