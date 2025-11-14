import express from "express"
import { razorPayOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create", razorPayOrder)
router.post("/verify",verifyPayment)

export default router