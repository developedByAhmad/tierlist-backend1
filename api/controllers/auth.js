const mongoose = require('mongoose');
const Auth = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const UserRanking = require('../models/userRankings');
const AdminRanking = require('../models/adminRankings');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }  

module.exports.signup = async (req, res, next) => {
    const { firstName, lastName, username, password, role } = req.body;
    Auth.findOne({ username: username })
        .exec()
        .then(async auth => {
            if (auth) {
                return res.status(403).json({
                    message: "username already exists"
                })
            }
            else {

                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: "password encryption error"
                        })
                    }
                    else {
                        const auth = new Auth({
                            _id: mongoose.Types.ObjectId(),
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            role: role,
                            password: hash
                        })

                        auth.save()
                            .then(async authObj => {
                                const id = authObj._id;
                                const token = await jwt.sign({ id }, process.env.JWT_SESSION_KEY)
                                localStorage.setItem('jwtToken',token);
                                res.status(201).json({
                                    message: "signup successful",
                                    user: authObj,
                                    token: token,
                                    id:id
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    Auth.findOne({ username: username })
        .exec()
        .then(async auth => {
            if (auth) {
                const id = auth._id;
                await bcrypt.compare(password, auth.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "password decryption error"
                        })
                    }
                    else {
                        if (result == true) {
                            // const userToken = localStorage.getItem('userToken')
                            const loginToken = jwt.sign({ id }, process.env.JWT_SESSION_KEY, { expiresIn: "1h" });
                            res.status(200).json({
                                message: "login successful",
                                token: loginToken,
                                user: auth,
                                id:id
                            })
                        }
                        else {
                            return res.status(403).json({
                                message: "invalid password"
                            })
                        }
                    }
                })
            }
            else {
                return res.status(404).json({
                    message: "no user found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })



}




