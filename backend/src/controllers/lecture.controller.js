import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import uploadOnCloudinary from "../storage/cloudinary.js";

export const createLecture = async (req, res) => {
  try {
    const { title } = req.body;
    const { courseId } = req.params;

    if (!title || !courseId) {
      return res.status(400).json({ message: "Title is required" });
    }

    const lecture = await Lecture.create({ title });
    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
    }

    await course.populate("lectures");

    await course.save();

    return res.status(201).json({ lecture, course });
  } catch (error) {
    console.log("Create Lectures: ", error);
  }
};

export const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course is not Available" });
    }

    await course.populate("lectures");
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    console.log("get Lectures :", error);
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, title } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(400).json({ message: "Lecture not found !" });
    }

    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lecture.title) {
      lecture.title = title;
    }
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    return res.status(200).json({ lecture });
  } catch (error) {
    console.log("Edit Lec :", error);
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    let lecture = await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({message: "Lecture Removed!"})
  } catch (error) {
    console.log("Remove Lecture :",error)
  }
};
