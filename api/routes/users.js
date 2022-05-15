import express from "express"
import { deleteUser, getUser, updateUser } from "../controllers/usersController.js"
import { verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/:id", getUser)

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser)

export default router