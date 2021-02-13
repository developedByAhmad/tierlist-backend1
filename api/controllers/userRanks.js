const mongoose = require('mongoose');
const Rank = require('../models/userRanks');
const AdminRanking = require('../models/userRankings');


module.exports.getAll = async (req, res, next) => {
    Rank.find()
        .exec()
        .then(ranks => {
            res.status(200).json({
                count: ranks.length,
                ranks: ranks
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.add = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const rank = new Rank({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description:description
    });

    rank.save()
        .then(rankObj => {
            const userRank = new userRanking({
                _id: mongoose.Types.ObjectId(),
                rank: rank._id,
                games: []
            });
            adminRank.save();
            res.status(201).json({
                message: "rank added successfully",
                rank: rankObj
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.getAllData = async (req, res, next) => {

}

module.exports.delete = async (req, res, next) => {
    const id = req.params.id;
    Rank.remove({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(201).json({
                    message: "rank deleted successfully"
                })
            }
            else {
                return res.status(404).json({
                    message: "no rank found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.update = async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    Rank.findOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                result.name = name;
                result.description = description;
                result.save()
                    .then(resultObj => {
                        res.status(201).json({
                            message: "rank updated successfully",
                            rank: resultObj
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }
            else {
                return res.status(404).json({
                    message: "no rank found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}    




module.exports.changeRank = async (req,res,next) => {
    const {rankId,gameId} = req.body;
    Game.findById(gameId)
    .exec()
    .then(game => {
        game.rank = rankId;
        game.save()
        .then(gameobj => {
            res.status(201).json({
                message : "game rank updated successfully",
                game: gameobj
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    })
}