const mongoose = require('mongoose');

const adminRanksSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    rank: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        unique:true,
        ref:"Rank"
    },
    games:{
        type:Array
    }


},
    { timestamps: true })

module.exports = mongoose.model('AdminRank', adminRanksSchema);