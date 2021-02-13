const mongoose = require("mongoose");
const Game = require("../models/games");
const Rank = require("../models/ranks");
const AdminRanking = require("../models/adminRankings");

module.exports.get = async (req, res, next) => {
  AdminRanking.find()
    .populate("rank")
    .exec()
    .then(async (adminRankings) => {
      for (const eachAdminRanking of adminRankings) {
        var i = 0;
        for (const eachGame of eachAdminRanking.games) {
          const game = await Game.findOne({ _id: eachGame });
          eachAdminRanking.games[i] = game;
          i++;
        }
      }

      res.status(200).json({
        count: adminRankings.length,
        adminRankings: adminRankings,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.update = async (req, res, next) => {
  const rankId = req.body.rank;
  const gameId = req.body.game;

  AdminRanking.find()
    .exec()
    .then((ranklist) => {
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

      AdminRanking.findById(rankId)
        .exec()
        .then(async (result) => {
          result.games.push(gameId);
          await result.save();
          res.status(201).json({
            message: "game rank updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
module.exports.updateNew = async (req, res, next) => {
  const allGames = JSON.parse(req.body.allGames);
  AdminRanking.find()
    .exec()
    .then((ranklist) => {
      //deleting old rank
      for (const eachRank of ranklist) {
        for (const eachGame of allGames) {
          if (eachGame._id == eachRank._id) {
            eachRank.games = eachGame.games;
          }
          console.log(eachRank);
          console.log(eachGame);
        }
      }
      ranklist.map(rank =>{
        AdminRanking.findOneAndUpdate({_id: rank._id}, rank, {upsert: true, new: true}, (err, docs)=>{})
      })
      res.status(201).json({
        message: "game rank updated successfully",
      });
    });
};
