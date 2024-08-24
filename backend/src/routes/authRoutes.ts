import express from "express";
import authController from "../controllers/authController";


export const authRouter = express.Router();

authRouter.post('/signIn', authController.signInUser) //  signInUser
authRouter.post('/signUp',authController.signUpUser) // signUpUser