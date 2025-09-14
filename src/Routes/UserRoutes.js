const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getUsers, createUser, deleteUser, updateUser } = require("../Controllers/UserControllers")
const { isAuthenticate, authenticateRoles } = require("../Middleware/AuthenticateUser")



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/users").get(isAuthenticate, authenticateRoles("admin"), getUsers)
    .post(isAuthenticate, authenticateRoles("admin"), createUser)

router.route("/delete/:id").delete(isAuthenticate, authenticateRoles("admin"), deleteUser)
router.route("/update/:id").put(updateUser)
module.exports = router