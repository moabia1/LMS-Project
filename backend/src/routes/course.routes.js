import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
} from "../controllers/course.controller.js";
import upload from "../storage/multer.js";



const router = express.Router();


router.post("/create", authMiddleware, createCourse);
router.get("/published", getPublishedCourses);
router.get("/creator", authMiddleware, getCreatorCourses);
router.post(
  "/edit/:courseId",
  authMiddleware,
  upload.single("thumbnail"),
  editCourse
);
router.get("/:courseId", getCourseById);
router.delete("/remove/:courseId", authMiddleware, deleteCourse);



export default router;
