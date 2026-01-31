import express from 'express';
import { SignUpUser,SignInUser,GetProfile,SignOutUser, getMyBookings, addFavouriteMovies, deleteFavouriteMovie, getFavouriteMovies} from '../controllers/userController.js';
import { Protect, Validate } from '../middleware/auth.js';

export let userRouter=express.Router();

userRouter.post("/signUp", Validate, SignUpUser);
userRouter.post("/signIn",Validate,SignInUser);
userRouter.get("/profile",Protect,GetProfile);
userRouter.get("/signOut",Protect,SignOutUser);
userRouter.get("/mybookings",Protect,getMyBookings);
userRouter.post("/addfavourite",Protect,addFavouriteMovies);
userRouter.post("/delfavourite",Protect,deleteFavouriteMovie);
userRouter.get('/favourites',Protect,getFavouriteMovies);
userRouter.get("/auth/me",Protect,(req,res)=>{
    res.json(req.user)
});
