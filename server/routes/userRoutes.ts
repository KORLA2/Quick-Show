import express from 'express';
import { SignUpUser,SignInUser,GetProfile,SignOutUser} from '../controllers/userController.ts';
import { Protect } from '../middleware/auth.ts';

export let userRouter=express.Router();

userRouter.post("/signUp",SignUpUser);
userRouter.post("/signIn",SignInUser);
userRouter.get("/profile",Protect,GetProfile);
userRouter.post('/signOut',SignOutUser)
