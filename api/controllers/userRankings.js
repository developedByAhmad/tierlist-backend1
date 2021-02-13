const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const Game = require("../models/userGames");
const Auth = require('../models/auth');
const userRank = require("../models/userRanks");
const UserRanking = require("../models/userRankings");

exports.checkById = (req, res, next) => {
  const id = req.params.id;
  // const name = req.body.name;
  // const description = req.body.description;
  Auth.findById({ _id: id })
    .then(doc => {
      UserRanking.findOne({ userId: id })
        // .populate("rank")
        .exec()
        .then(async userRankList => {
          if (userRankList) {
            // for (const eachRank of userRankList.userData) {
            //   let i=0;
            //   for(const eachGame of eachRank.games){
            //     eachRank.games[i]=eachGame; 
            //   }
            //   i++;
            // }
            // for (const eachRank of userRankList.userData) {
            //   var i = 0;
            //   for (const eachGame of eachAdminRanking.games) {
            //     const game = await Game.findOne({ _id: eachGame });
            //     eachAdminRanking.games[i] = game;
            //     i++;
            //   }
            // }
            res.status(200).json({
              message: "UserData can be Read",
              count: UserRanking.length,
              userRankings: userRankList.userData,
            });
            console.log(userRankings);
          }
          else {
            const user_Rank = new userRank({
              _id: mongoose.Types.ObjectId(),
              // name: name,
              // description: description
            });
            user_Rank.save()
              .then(rankObj => {
                const User_Ranking = new UserRanking({
                  _id: mongoose.Types.ObjectId(),
                  userData: [],
                  userId: id
                });
                User_Ranking.save();
                res.status(201).json({
                  message: "User rank added successfully",
                  rank: rankObj,
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          }
        })
        .catch(err => {
          res.status(500).json({
            result: "this", err
          })
        })

    })
    .catch(err => {
      res.status(500).json({
        error: "id not found",
      })

      // res.status(201).json({
      //   message: "id not found",
      //   id: id,
      //   name: name,
      //   description: description
      // })
    })
  // auth.exec() 
  //   .then(async auth => {
  //     if (auth) {
  //       U.find(id)
  //         .populate("rank")
  //         .exec()
  //         .then(async (adminRankings) => {
  //           for (const eachAdminRanking of adminRankings) {
  //             var i = 0;
  //             for (const eachGame of eachAdminRanking.games) {
  //               const game = await Game.findOne({ _id: eachGame });
  //               eachAdminRanking.games[i] = game;
  //               i++;
  //             }
  //           }

  //           res.status(200).json({
  //             count: adminRankings.length,
  //             adminRankings: adminRankings,
  //           });
  //         })
  //     } else {
  //       const id = req.params.id;
  //       const name = req.body.name;
  //       const description = req.body.description;
  //       const rank = new userRank({
  //         _id: id,
  //         name: name,
  //         description: description
  //       });
  //       rank.save()
  //         .then(rankObj => {
  //           const userRank = new U({
  //             _id: mongoose.Types.ObjectId(),
  //             rank: rank._id,
  //             games: [],
  //             userId: id
  //           });
  //           userRank.save();
  //           res.status(201).json({
  //             message: "User rank added successfully",
  //             rank: rankObj
  //           })
  //         })
  //         .catch(err => {
  //           res.status(500).json({
  //             error: (err, "sss")
  //           })
  //         })
  //       // res.status(201).json({
  //       //   message: " new login",
  //       // });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
};

module.exports.get = async (req, res, next) => {
  UserRanking.find()
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

  UserRanking.find()
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

      UserRanking.findById(rankId)
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

module.exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const loginId = req.body.loginId;
  const rank_id = req.body.rank_id;
  UserRanking.findOne({ userId: loginId })
    .exec()
    .then(async (result) => {
      // console.log("===>", result);
      if (result) {

        // await result[0].userData.map(rank=>(console.log("Rank",rank)))


        // await result.userData.map(rank => (rank.rank._id === rank_id ? rank.games.map((game, index) => (game._id === id ? ( game=[] ): game)) : rank))
        // let d = result.userData.filter(rank => rank.rank._id === rank_id)[0].games.filter(game=>game._id !== id)
        // console.log(d)

        for (let i = 0; i < result.userData.length; i++) {
          if (result.userData[i].rank._id === rank_id) {
            let newgame = result.userData[i].games.filter(game => game._id !== id)
            console.log(newgame)
            result.userData[i].games = newgame
            result.save().then(sav => {
              console.log('=====', sav)
            }).catch(er => {
              console.log(er)
            });
            res.status(201).json({
              message: 'game deleted successfully',
            });

          }
        }
        result.markModified('userData')
        // let y = d.games.filter(game=>game._id !== id)

        // console.log(y)
        // for (ele of result){
        // for (items of result.userData) {

        //   if (items.rank._id === rank_id) {
        //     let newArr = items.games.filter(game => game._id !== id)
        //     console.log(newArr)
        //   }
        //   for (eachGame of items.games) {

        //     if (eachGame._id === id) {
        //       eachGame = 'any thing';

        //       console.log('each game', eachGame)
        //     }
        //   }
        // }
        // }
        // console.log("246===>", result);
        // await result.save()
        // await result[0].save()
        result.save().then(sav => {
          console.log('=====', sav)
        }).catch(er => {
          console.log(er)
        });
        res.status(201).json({
          message: 'game deleted successfully',
        });

        // await result.save();

        // result.userData.push({ games: item.games, rank: userRanklist.rank = item.rank })

        // await result[0].userData.push(rank => (rank.rank._id === rank_id ? rank.games.map(game => (game._id === id ? game = [] : game)): rank))

        // var ll = await result[0].userData.map(rank => {
        //   if (rank.rank._id === rank_id) {
        //     rank.games.map((game => {
        //       if (game._id === id) {
        //         game = null
        //       }
        //     }))
        //   }
        // })
        // await result.save();
        // var saved = await result.save();

        // await result[0].userData.map(rank=>(rank.rank._id === rank_id ? rank.games[0]._id===id ?rank :"11111":"22222222222"))

        // const userData=result.userData //rank.games.remove({_id : id})

        // for (const item of userData) {

        //   console.log('===========', item.games)

        //   // userRanklist.userData.push({ games: item.games, rank: userRanklist.rank = item.rank })

        //   // userRanklist.rank=item.rank;
        // }
      }

      // //result.remove({ _id: id })
      // if (result.deletedCount > 0) {
      // 	res.status(201).json({
      // 		message: 'game deleted successfully',
      // 	});
      // } else {
      // 	return res.status(404).json({
      // 		message: 'no game found',
      // 	});
      // }
    })
    .catch((err) => {
      console.log("err is", err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.updateNew = async (req, res, next) => {
  const allGames = JSON.parse(req.body.allGames);
  const gameId = req.body.gameId
  console.log("===>>allGames", allGames)
  const id = req.body.id;
  // console.log(id)
  UserRanking.findOne({ userId: id })
    .exec()
    .then(async (userRanklist) => {
      //deleting old rank
      console.log("===>>userRankList", userRanklist);
      if (userRanklist) {
        userRanklist.userData = []
        for (const item of allGames) {

          console.log('===========games', item.games)

          // var newArray = userRanklist.userData.filter(value => Object.keys(value).length !== 0);

          userRanklist.userData.push({ games: item.games, rank: userRanklist.rank = item.rank })

          // userRanklist.rank=item.rank;
        }
        var saved = await userRanklist.save();
        console.log("savedData", saved);

      }
      else {
        res.status(500).json({
          msg: "Id not found"
        });
      }
      // console.log(userRanklist.userData)
      // userRanklist.userData.map(game=>(
      //   game.games.map(item=>(
      //     item._id=Date.now()
      //   ))
      // ))
      // else {
      //   for (const item of allGames) {

      //     console.log('===========', item.games)

      //     userRanklist.userData.push({ games: item.games, rank: userRanklist.rank = item.rank })

      //     // userRanklist.rank=item.rank;
      //   }
      //   userRanklist.userData.games.map(game=>(
      //     game._id=Date.now()
      //   ))
      // }

      // const allgame=allGames.forEach((game,id)=>(
      //   userRanklist.games.push(game.games[id]),
      //   userRanklist.rank=game.rank
      // ))
      // console.log(allgame);
      // return 


      // for (const user of userRanklist) { // userRanking list
      //   console.log()
      //   for (const item of allGames) { // allGames are the games coming from front
      //     // console.log(eachRank);
      //     //   console.log(eachGame);
      //     if (item._id == user._id) {
      //       user.games = item.games;

      //     }
      //     else console.log("userRanking and game recieving rank's ids are not matching")
      //   }
      // }
      // userRanklist.map(rank => {
      // UserRanking.findOneAndUpdate({ _id: rank._id }, rank, { upsert: true, new: true }, (err, docs) => { })
      // })
      res.status(201).json({
        message: "game rank updated successfully",
      });
    })
    .catch((err) => {
      console.log("in error", err)
      res.status(500).json({
        updateError: err,
      });
    });
};
