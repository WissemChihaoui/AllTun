import bcrypt from "bcrypt"
import User from "../models/User.js"

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        console.log(err)
        res.status(404).json("user not found")
    }
}

export const updateUser = async(req, res, next) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }

}

export const deleteUser = async(req, res, next) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted !")
        } catch (err) {
            res.json(err)
        }
    } else {
        res.status(401).json("you can delete only your account")
    }
}