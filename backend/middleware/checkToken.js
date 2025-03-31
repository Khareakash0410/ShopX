const jwt = require("jsonwebtoken");



const checkToken = async (req, res, next) => {
    let token = req.headers.authorization;

    if(!token) return res.status(400).json({message: "Token not found!"});

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if (err) {
            if (err.name = "TokenExpiredError") {
              return res.status(400).json({message: "Token Already Expired"})
            }
            else if (err.name = "JsonWebTokenError") {
             return res.status(400).json({message: "Invalid Token Found"})
            } 
            else {
             return res.status(400).json({message: "Authentication Failed"})
            }
        } 

        req.user = decoded.user.id;
        next();
    }); 
};


module.exports = checkToken;