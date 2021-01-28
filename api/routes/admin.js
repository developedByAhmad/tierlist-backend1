const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/auth');

const adminController = require('../controllers/admin');
router.get("/get", checkAuth,adminController.get)
router.post("/add",  checkAuth,adminController.add)


module.exports = router;