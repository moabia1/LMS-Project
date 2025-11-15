import Course from "../models/course.model.js";
import uploadOnCloudinary from "../storage/cloudinary.js";
import User from "../models/user.model.js"

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res
        .status(500)
        .json({ message: "Title and category is required" });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.id,
    });

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Create Course Error: ${error}` });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const {courseId} = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Course Find Error: ${error}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("lectures reviews");

    if (!courses) {
      return res.status(400).json({ message: "Courses not found !!" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find isPublished course: ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(500).json({ message: "User not Found" });
    }

    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res.status(500).json({ message: "Course not Found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to find Creator course: ${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const {courseId} = req.params;

    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    } = req.body;

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course Not Found" });
    }

    const updateData = {
      title,
      thumbnail,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Course Edit Failed: ${error}` });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.params;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId, { new: true });
    
    return res.status(200).json({message:"Course Deleted Successfully"})

  } catch (error) {
    return res.status(500).json({ message: `Course Deletion Failed: ${error}` });
  }
};

export const getCreator = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password")
    
    if (!user) {
      return res.status(400).json({message: "User not found"})
    }

    return res.status(200).json(user)
  } catch (error) {
    console.log("GetCreator :",error)
  }
}