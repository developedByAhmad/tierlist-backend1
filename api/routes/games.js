const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require ('../middleware/auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './images/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, new mongoose.Types.ObjectId() + file.originalname)
//     }
// })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        console.log('if')
        cb(null, true);
    }
    else {
        console.log('else')
        cb(null, false);
    }
}

const upload = multer({
    storage: storage
    , limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

const gameController = require('../controllers/games');
router.get("/getById/:id", checkAuth,gameController.getById)
router.get("/getAll", checkAuth,gameController.getAll)
router.post("/add",upload.fields([{ name: 'coverImage' }, { name: 'images' }]),checkAuth, gameController.add)
router.delete("/delete/:id", gameController.delete)
router.post("/update/:id",upload.fields([{ name: 'coverImage' }, { name: 'images' }]), checkAuth,gameController.update)

// upload.fields([{ name: 'coverImage' }, { name: 'images' }]),
module.exports = router;