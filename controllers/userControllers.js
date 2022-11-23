const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator")


const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}


const registerUser = async (req, res) => {
    try {

        const { userName, email, country, password } = req.body
        // if user exists
        const exists = await User.findOne({ email })
        if (exists) {
            return res.json({ error: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({error:"Please enter a valid email"})
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({error:"Please enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)


        const newUser = new User({
            userName,
            email,
            country,
            password: hash
        })

        const savedUser = await newUser.save()

        const token = createToken(savedUser._id)


        res.status(201).json({ savedUser, token })

    } catch (error) {
         res.json(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "The user does not exist" })
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.json({ error: "Incorrect password" })
        }

        const loginToken = createToken(user._id)

        return res.status(200).json({ user, loginToken })

    } catch (error) {
        return res.json(error)
    }
}
module.exports = { registerUser, loginUser }