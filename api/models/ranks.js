const mongoose = require('mongoose');

const ranksSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('Rank', ranksSchema);