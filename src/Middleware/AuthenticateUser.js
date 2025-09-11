const jwt = require("jsonwebtoken")

const User = require("../Models/UserModel")
const CatchAsyncError = require("./CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler")


const isAuthenticate = CatchAsyncError(async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            next(new ErrorHandler("Login & Try Again", 404))
        }

        const decodedId = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedId.id)

        if (!user) {
            return res.status(404).json({
                "message": "Log In First Then Access"
            })
        }

        res.user = user;
        next()

    }
    catch (error) {
        next(new ErrorHandler(error.message))
    }
})


module.exports = { isAuthenticate }