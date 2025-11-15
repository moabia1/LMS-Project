import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/config.js"
import cors from "cors"
import courseRoutes from "./routes/course.routes.js"
import lectureRoutes from "./routes/lecture.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import reviewRoutes from "./routes/review.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(
  cors({
    origin: "https://skill-nest-course.vercel.app/",
    credentials: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL:
        "https://lms-project-wqss.onrender.com/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    }
  )
);


app.use("/api/auth", authRoutes)
app.use("/api/course",courseRoutes)
app.use("/api/lecture", lectureRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/review",reviewRoutes)

export default app