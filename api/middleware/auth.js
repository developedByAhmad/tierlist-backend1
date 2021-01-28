var jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    var userToken = localStorage.getItem('jwtToken')
    try {
        var decoded = jwt.verify(userToken, process.env.JWT_SESSION_KEY);
        req.userData=decoded;
        // var token = userToken.split(" ")[1];
        // console.log(token);
        // var decode = jwt.verify(token, process.env.JWT_SESSION_KEY)
        // console.log(decode);
        // req.userData=decode;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Invalid Token"
        })
    }
}