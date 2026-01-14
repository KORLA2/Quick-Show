import express from 'express';
import { SignUpUser,SignInUser,GetProfile,SignOutUser} from '../controllers/userController.ts';
import { Protect, Validate } from '../middleware/auth.ts';

export let userRouter=express.Router();

userRouter.post("/signUp", Validate, SignUpUser);
userRouter.post("/signIn",Validate,SignInUser);
userRouter.get("/profile",Protect,GetProfile);
userRouter.get("/signOut",SignOutUser)
userRouter.get("/auth/me",Protect,(req,res)=>{
    res.json(req.user)
});