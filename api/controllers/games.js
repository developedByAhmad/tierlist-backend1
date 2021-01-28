const mongoose = require('mongoose');
const Game = require('../models/games');
const Rank = require('../models/ranks');
const AdminRanking = require('../models/adminRankings');

module.exports.getById = async (req, res, next) => {
	const id = req.params.id;
	Game.findById(id)
		.exec()
		.then((games) => {
			res.status(200).json({
				count: games.length,
				games: games,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.getAll = async (req, res, next) => {
	Game.find()
		.exec()
		.then((games) => {
			res.status(200).json({
				count: games.length,
				games: games,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.add = async (req, res, next) => {
	const { rank, name, releaseYear, genre, releaseMonth, publishedBy, generalReview, dailyGrindReview, appleAppStore, googlePlayStore } = req.body;
	let coverImage;
	let images;
	console.log(req.body);
	console.log(req.files);
	if (req.files && Object.keys(req.files).length > 0) {
		if (req.files.coverImage) {
			// console.log(`req.files.coverImage ${req.files.coverImage?.path}`);
			coverImage = req.files.coverImage[0].path;
			console.log(`coverImage ${coverImage}`);
		}

		if (req.files.images && req.files.images.length > 0) {
			images = [];
			for (const image of req.files.images) {
				images.push(image.path);
			}
		}
	}
	const game = new Game({
		_id: mongoose.Types.ObjectId(),
		name: name,
		releaseYear: releaseYear,
		releaseMonth: releaseMonth,
		genre: genre,
		coverImage: coverImage,
		images: images,
		publishedBy: publishedBy,
		generalReview: generalReview,
		dailyGrindReview: dailyGrindReview,
		appleAppStore: appleAppStore,
		googlePlayStore: googlePlayStore,
	});

	game.save()
		.then(async (gameobj) => {
			//save default rank for game
			const newRank = await AdminRanking.findOne({ rank: rank }).exec();
			if (newRank) {
				newRank.games.push(gameobj._id);
				await newRank.save();
				//save default rank for game
				res.status(201).json({
					message: 'game added successfully',
					game: gameobj,
				});
			} else {
				res.status(200).json({
					message: 'Admin rank not found',
					game: gameobj,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.delete = async (req, res, next) => {
	const id = req.params.id;
	Game.remove({ _id: id })
		.exec()
		.then((result) => {
			if (result.deletedCount > 0) {
				res.status(201).json({
					message: 'game deleted successfully',
				});
			} else {
				return res.status(404).json({
					message: 'no game found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.update = async (req, res, next) => {
	const id = req.params.id;

	const { name, releaseYear, genre, releaseMonth, publishedBy, generalReview, dailyGrindReview, appleAppStore, googlePlayStore } = req.body;
	const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null;
	console.log(`coverImage ${coverImage}`);

	var images = [];
	if (req.files.images) {
		for (const image of req.files.images) {
			images.push(image.path);
		}
	}

	Game.findOne({ _id: id })
		.exec()
		.then((result) => {
			if (result) {
				result.name = name;
				result.releaseYear = releaseYear;
				result.releaseMonth = releaseMonth;
				result.genre = genre;
				result.coverImage = coverImage ? coverImage : result.coverImage;
				result.images = images.length > 0 ? images : result.images;
				result.publishedBy = publishedBy;
				result.generalReview = generalReview;
				result.dailyGrindReview = dailyGrindReview;
				result.appleAppStore = appleAppStore;
				result.googlePlayStore = googlePlayStore;
				result
					.save()
					.then((resultObj) => {
						res.status(201).json({
							message: 'game updated successfully',
							game: resultObj,
						});
					})
					.catch((err) => {
						res.status(500).json({
							error: err,
						});
					});
			} else {
				return res.status(404).json({
					message: 'no game found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};