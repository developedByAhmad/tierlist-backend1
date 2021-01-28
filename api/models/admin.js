const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    youtube: {
        type: String,
        required: true
    },
    twitch: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    patreon: {
        type: String,
        required: true
    },
},
    )

module.exports = mongoose.model('Admin', adminSchema);