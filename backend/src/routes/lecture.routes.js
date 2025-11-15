import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createLecture,
  editLecture,
  getLecture,
  removeLecture,
} from "../controllers/lecture.controller.js";
import upload from "../services/multer.js";

const router = express.Router();

router.get("/:courseId", authMiddleware, getLecture);
router.post("/create/:courseId", authMiddleware, createLecture);
router.post(
  "/update/:lectureId",
  authMiddleware,
  upload.single("videoUrl"),
  editLecture
);
router.delete("/remove/:lectureId", authMiddleware, removeLecture);

export default router;
