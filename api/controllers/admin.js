const Admin = require('../models/admin');
const mongoose = require('mongoose');

module.exports.add = async (req, res, next) => {
    const { youtube, twitch, twitter, patreon } = req.body;
    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        youtube: youtube,
        twitch: twitch,
        twitter: twitter,
        patreon: patreon
    })

    admin.save()
    .then(adminObj => {
        res.status(201).json({
            message : "data added successfully",
            data:adminObj
        })
    })
    .catch(err=>{ 
        res.status(500).json({
            error : err
        })
    })
}

module.exports.get = async (req, res, next) => {
    Admin.find()
    .sort({_id:-1})
    .limit(1)
    .exec()
    .then(adminList => {
        adminObj = adminList[0];
        res.status(200).json({
            data: adminObj
        })
    })
    .catch(err=>{ 
        res.status(500).json({
            error : err
        })
    })
}