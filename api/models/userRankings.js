const mongoose = require('mongoose');

const userRanksSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    rank: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Rank"
    },
    games: {
        type: Array
    },
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth"
    }


},
    { timestamps: true })

module.exports = mongoose.model('UserRank', userRanksSchema);