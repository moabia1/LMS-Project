import Course from "../models/course.model.js"
import Review from "../models/review.model.js"

export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body
    const userId = req.id

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(400).json({message:"Course not found"})
    }

    const alreadyReviewed = await Review.findOne({ course: courseId, user: userId })
    if (alreadyReviewed) {
      return res.status(400).json({message:"You have already Reviewed this course"})
    }

    const review = await Review.create({
      course: courseId,
      user: userId,
      rating: rating,
      comment:comment
    })
    await review.save()
    await course.reviews.push(review._id)
    await course.save()

    return res.status(201).json(review)
  } catch (error) {
    console.log("Failed to create review :",error)
  }
}


export const getReview = async (req, res) => {
  try {
    const review = await Review.find({}).populate("user", "fullName", "avatar", "role").sort({ reviewdAt: -1 })
    
    return res.status(200).json(review)
  } catch (error) {
    
  }
}