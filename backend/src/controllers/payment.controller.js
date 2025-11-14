import Razorpay from "razorpay";
import config from "../config/config.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

export const razorPayOrder = async (req,res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId}`.toString(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.log("razorpay error ",error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyPayment = async (req,res) => {
  try {
    const { courseId, userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
         user.enrolledCourses.push(courseId)
        await user.save()
      }

      const course = await Course.findById(courseId).populate("lectures");
      if (!course.enrolledStudent.includes(userId)) {
        course.enrolledStudent.push(userId)
        await course.save()
      }

      return res.status(200).json({message: "Paymnet verified and enrollment success"})
    }
    else {
      return res.status(400).json({message: "Paymnet failed"})
    }
  } catch (error) {
    return res.status(500).json({message:"getting error during payment"})
  }
}