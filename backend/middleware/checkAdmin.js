const User = require("../models/User");



const checkAdmin = async (req, res, next) => {
    const user = await User.findById(req.user);

    if (user.role === "admin") {
        next();
    } else {
       res.status(400).json({
        message: "Not Authorize as admin!"
       });
    }
}


module.exports = checkAdmin;