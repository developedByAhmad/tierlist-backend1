const mongoose = require('mongoose');
const Game = require('../models/games');
const Rank = require('../models/ranks');
const AdminRanking = require('../models/adminRankings');
const UserRanking = require('../models/userRankings');


module.exports.get = async (req, res, next) => {
    const id = req.params.id;
    UserRanking.find({ auth: id })
        .exec()
        .then(async userRankingsList => {
            for (const eachUserRanking of userRankingsList) {
                var i = 0;
                for (const eachGame of eachUserRanking.games) {
                    const game = await Game.findOne({ _id: eachGame });
                    eachUserRanking.games[i] = game;
                    i++;
                }
            }

            res.status(200).json({
                count: userRankingsList.length,
                userRankings: userRankingsList
            })
    

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.update = async (req, res, next) => {
    const rankId = req.body.rank;
    const gameId = req.body.game;
    const authId = req.body.auth;

    UserRanking.find({auth:authId})
        .exec()
        .then(ranklist => {

            //deleting old rank
            for (const eachRank of ranklist) {
                var i = 0;
                for (const eachGame of eachRank.games) {
                    if (eachGame == gameId) {
                        eachRank.games.splice(i, 1);
                    }
                    i++;
                }
            }
            //deleting old rank

            UserRanking.findById(rankId)
                .exec()
                .then(async result => {
                    result.games.push(gameId);
                    await result.save();
                    res.status(201).json({
                        message: "game rank updated successfully"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}         