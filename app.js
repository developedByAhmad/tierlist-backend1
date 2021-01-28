const express = require('express');

const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const jsonwebtoken = require('jsonwebtoken');

// mongoose.connect('mongodb://localhost:27017/tierListDB', { useNewUrlParser: true } , { useUnifiedTopology: true });
mongoose.connect('mongodb+srv://user1:jackechan123@cluster0.u3ytg.mongodb.net/tierListDB?retryWrites=true&w=majority', { useNewUrlParser: true } , { useUnifiedTopology: true });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use('/images', express.static('images'));

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }

const gamesRoute = require('./api/routes/games');
const ranksRoute = require('./api/routes/ranks');
const authRoute = require('./api/routes/auth');
const adminRoute = require('./api/routes/admin');
const userRankingRoute = require('./api/routes/userRankings');
const adminRankingRoute = require('./api/routes/adminRankings');



app.use('/games',gamesRoute);
app.use('/rank', ranksRoute);
app.use('/auth',authRoute);
app.use('/admin',adminRoute);
app.use('/userRanking', userRankingRoute);
app.use('/adminRanking', adminRankingRoute);
app.use('/checkPalindrome/:name', (req, res, next) => {
	const name = req.params.name;
	var nameCheck = [];
	var nameCheckReverse = [];
	var namePalindrome = true;
	var i;
	var j;
	var c;
	for (i == 0; i < name.toString().length; i++) {
		var a = name.charAt(i);
		nameCheck.push(a);
	}

	for (j == name.toString().length - 1; j == 0; j--) {
		var b = name.charAt(j);
		nameCheckReverse.push(b);
	}

	for (c == 0; c < name.toString().length; c++) {
		if (namecheck[c] != nameCheckReverse[c]) {
			namePalindrome = false;
		}
	}
	if (namePalindrome == false) {
		return res.status(200).json({
			message: 'name not palindrome',
		});
	} else {
		return res.status(200).json({
			message: 'name is palindrome',
		});
	}
});

app.use('/base', (req, res, next) => {
	res.status(200).json({
		message: 'hello world',
	});
});

app.use((req, res, next) => {
	console.log(req);
	res.status(404).json({
		message: 'no such route found',
		route: `${req.headers.host}${req.url}`,
	});
});

module.exports = app;
