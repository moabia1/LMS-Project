import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createReview, getReview } from "../controllers/review.controller.js"

const router = express.Router()

router.post("/create", authMiddleware, createReview)
router.get("/get-review",getReview)

export default router