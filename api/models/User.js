import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        /* required: true,
        unique: true */
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        /* required: true */
    },
    lastname: {
        type: String,
        /* required: true */
    },
    profile_pic: {
        type: String,
        default: ""
    },
    role: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)