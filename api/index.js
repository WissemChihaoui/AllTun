import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import annoncesRoute from "./routes/annonces.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    } catch (err) {
        throw err
    }
}

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/annonces", annoncesRoute)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something wrong !"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    })
})

app.listen(process.env.PORT || "8800", () => {
    connect()
    console.log("backend server connect in port : " + process.env.PORT)
})