import express from "express"
import Annonce from "../models/Annonce.js"

const router = express.Router()

router.post("/", async(req, res, next) => {
    const newAnnonce = new Annonce(req.body)
    try {
        const annonce = await newAnnonce.save()
        res.status(200).json(annonce)
    } catch (err) {
        console.log(err)
    }
})

router.get("/", async(req, res, next) => {
    try {
        const annonces = await Annonce.find()
        res.status(200).json(annonces)
    } catch (err) {
        res.json(err)
    }
})

router.get("/:id", async(req, res, next) => {
    try {
        const annonce = await Annonce.findById(req.params.id)
        res.status(200).json(annonce)
    } catch (err) {
        res.json("annonce not found")
    }
})

router.put("/:id", async(req, res, next) => {
    try {
        const annonce = await Annonce.findById(req.params.id)
        if (annonce.userId === req.body.userId) {
            const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedAnnonce)
        } else {
            res.json("you can update only your annonce")
        }
    } catch (err) {
        res.json(err)
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const annonce = await Annonce.findById(req.params.id)
        if (annonce.userId === req.body.userId) {
            try {
                await Annonce.findByIdAndDelete(req.params.id)
                res.status(200).json("annonce hes been deleted")
            } catch (err) {
                console.log(err)
            }
        } else {
            res.json("you can delete only your annonce")
        }
    } catch (err) {
        console.log(err)
    }
})

export default router