const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers, createUser } = require("../Controllers/UserControllers")
const { isAuthenticate, authenticateRoles } = require("../Middleware/AuthenticateUser")



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getUsers").get(isAuthenticate, authenticateRoles("admin"), getUsers)
router.route("/createuser").post(isAuthenticate, authenticateRoles("admin"), createUser)

module.exports = router