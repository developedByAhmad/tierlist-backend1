const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    coverImage:{
        type: String,
        // required: true
    },
    images:{
        type:Array,
        // required:true
    },
    releaseMonth: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedBy: {
        type: String,
        required: true
    },
    
    generalReview: {
        type: String,
    },

    dailyGrindReview: {
        type: String,
    },

    appleAppStore: {
        type: String,
    },
    
    googlePlayStore: {
        type: String,
    },
    
},
    { timestamps: true })

module.exports = mongoose.model('Game', gamesSchema);