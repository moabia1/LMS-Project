import Course from "../models/course.model.js";
import { aiResponse } from "../services/ai.service.js";

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    const prompt = `You are an intelligent assistant for an LMS Platform. A user will type an query about what they want to learn. your task to understand the intent and return one **most relevant keyword** from the following list of course categories
     and levels:
     -App Development
     -AI/ML
     -AI Tools
     -Data Science
     -Data Analytics
     -Ethical Hacking
     -UI/UX Designing
     -Web Development
     -Others
     
     only reply with one single keyword from the list above the best matches the query. Do not explain anything. No extra text.
     Query${input}`;
    
    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const keyword = await aiResponse(prompt);

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    if (!courses) {
      return res.status(400).json({ message: "Course not Exists" });
    }

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { subTitle: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { level: { $regex: keyword, $options: "i" } },
        ],
      });
      return res.status(200).json(courses);
    }
 
  } catch (error) {
    console.log("failed to search :", error);
  }
};
