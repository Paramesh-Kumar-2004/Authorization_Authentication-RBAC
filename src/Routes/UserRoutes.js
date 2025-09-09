const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers } = require("../Controllers/UserControllers")




router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getUser").get(getUsers)


module.exports = router