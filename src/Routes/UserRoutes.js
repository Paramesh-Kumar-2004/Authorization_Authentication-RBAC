const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers } = require("../Controllers/UserControllers")
const { isAuthenticate } = require("../Middleware/AuthenticateUser")



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getUser").get(isAuthenticate, getUsers)


module.exports = router