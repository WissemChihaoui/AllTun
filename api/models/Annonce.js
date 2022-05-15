import mongoose from "mongoose"

const annonceShema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    images: {
        type: Array,
    },
    prix: {
        type: Number,
    },
    map: {
        type: Array,
    },
    userId: {
        type: String,
        required: true
    },
    nbRooms: {
        type: Number,
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Annonce", annonceShema)