import express from "express";
import {
  getUserController,
  googleAuthCallback,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { loginUserValidation, registerUserValidation } from "../middlewares/validator.middleware.js";


const router = express.Router();

router.post("/register",registerUserValidation,registerController);
router.post("/login",loginUserValidation,loginController);
router.get("/logout", logoutController);
router.get("/get-user", authMiddleware, getUserController)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

export default router;
