const mongoose = require("mongoose")
const validator = require("email-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Enter The Email"],
        unique: [true, "This Email Already Registered"],
        validate: [validator.validate, "Please Enter The Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Enter The Password"],
        select: false
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 14);
});

UserSchema.methods.isPasswordValid = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getJWTtoken = async function () {
    return jwt.sign(
        { id: this._id }, process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES }
    )
}

module.exports = mongoose.model("User", UserSchema)