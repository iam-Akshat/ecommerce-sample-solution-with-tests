const { User } = require("../models/User")

const verifyIsAdmin = async(req,res,next) =>{
    const user = await User.findById(req.user["_id"])
    req.isAdmin =  user.role === "admin"
    next()
}

module.exports = {verifyIsAdmin}