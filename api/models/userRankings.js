// const mongoose = require('mongoose');

// const userRanksSchema = mongoose.Schema({
//     _id: {
//         type: mongoose.Schema.Types.ObjectId
//     },
//     rank: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Rank"
//     },
//     games: {
//         type: Array
//     },
//     auth: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Auth"
//     }


// },
//     { timestamps: true })

// module.exports = mongoose.model('UserRank', userRanksSchema);

const mongoose = require('mongoose');

const userRanksSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    userData:{
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String,
            // required: true
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
            // required: true
        },
        releaseYear: {
            type: String,
            // required: true
        },
        genre: {
            type: String,
            // required: true
        },
        publishedBy: {
            type: String,
            // required: true
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
        
    type:Array
},
    userId:{
        type:String
    },

},
    { timestamps: true })

module.exports = mongoose.model('UserRanking', userRanksSchema);