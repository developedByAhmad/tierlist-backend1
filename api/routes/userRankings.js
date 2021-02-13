// const express = require('express');
// const router = express.Router();
// const checkAuth = require ('../middleware/auth');

// const userController = require('../controllers/http://localhost:8000/');
// router.get("/get/:id", checkAuth,userController.get)
// router.patch("/update", checkAuth, userController.update)


// module.exports = router;

const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/auth');

const userRankingController = require('../controllers/userRankings');
router.get("/get", checkAuth,userRankingController.get)
router.patch("/update", checkAuth,userRankingController.update)
router.post("/update-new", checkAuth,userRankingController.updateNew)
router.get("/checkById/:id",userRankingController.checkById)
router.post("/delete/:id",userRankingController.delete)


module.exports = router;