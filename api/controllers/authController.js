import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { createError } from "../utils/error.js"

export const register = async(req, res, next) => {
    try {
        const isUser = await User.findOne({ email: req.body.email })
        isUser && next(createError(409,"you have already an account !"))

        const { password, ...info } = req.body
        const newUser = new User(info)

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPass = await bcrypt.hash(password, salt)

        newUser.password = hashedPass

        try {
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        next(createError((500,"something wrong !")))
    }
}

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(400).json("wrong credentials !")

        const validatedPass = await bcrypt.compare(req.body.password, user.password)
        !validatedPass && res.status(400).json("wrong credentials !")

        const { password,isAdmin, ...others } = user._doc
        const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY_JWT)
        res.cookie("access_token","Bearer "+token,{
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        console.log(err)
    }
}