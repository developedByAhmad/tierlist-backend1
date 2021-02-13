const express = require('express');
const router = express.Router();
const rankController = require('../controllers/userRanks');
const checkAuth = require ('../middleware/auth');

router.get("/getAll", checkAuth,rankController.getAll)
router.post("/add",checkAuth,rankController.add)
router.get("/getAllData", checkAuth,rankController.getAllData)
router.delete("/delete/:id", checkAuth,rankController.delete)
router.patch("/update/:id", checkAuth,rankController.update)
router.patch("/changeRank", checkAuth,rankController.changeRank)



module.exports = router;