import express from 'express';
import { SignUpUser,SignInUser,GetProfile,SignOutUser, getMyBookings, addFavouriteMovies, deleteFavouriteMovie, getFavouriteMovies, deleteBookings, MakePayment} from '../controllers/userController.js';
import { Protect, Validate } from '../middleware/auth.js';

export let userRouter=express.Router();

userRouter.post("/signUp", Validate, SignUpUser);
userRouter.post("/signIn",Validate,SignInUser);
userRouter.get("/profile",Protect,GetProfile);
userRouter.get("/signOut",Protect,SignOutUser);
userRouter.get("/mybookings",Protect,getMyBookings);
userRouter.post("/bookings/pay",Protect,MakePayment);
userRouter.post("/addfavourite",Protect,addFavouriteMovies);
userRouter.post("/delfavourite",Protect,deleteFavouriteMovie);
userRouter.get('/favourites',Protect,getFavouriteMovies);
userRouter.delete("/bookings/delete",Protect,deleteBookings)
userRouter.get("/auth/me",Protect,(req,res)=>{
    res.json(req.user)
});

