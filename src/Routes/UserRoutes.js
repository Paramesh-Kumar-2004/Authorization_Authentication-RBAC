const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers } = require("../Controllers/UserControllers")
const { isAuthenticate, authenticateRoles } = require("../Middleware/AuthenticateUser")



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getUser").get(isAuthenticate, authenticateRoles("admin"), getUsers)


module.exports = router