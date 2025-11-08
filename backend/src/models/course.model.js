import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  subTitle: {
    type:String
  },
  description: {
    type:String
  },
  category: {
    type: String,
    required:true
  },
  level: {
    type: String,
    enum:["beginner","intermediate","advanced"]
  },
  price: {
    type:String
  },
  thumbnail: {
    type:String
  },
  enrolledStudent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  lectures: [{
    type:mongoose.Schema.Types.ObjectId
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  isPublished: {
    type: Boolean,
    default:false
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
}, { timestamps: true })


const Course = mongoose.model("Course", courseSchema);

export default Course