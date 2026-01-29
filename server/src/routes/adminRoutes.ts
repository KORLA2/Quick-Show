import express from 'express'
import { Validate } from '../middleware/auth.js';
import { adminSignInController, adminSignUpController, getAllBookings, getAllShows, getDashBoardController } from '../controllers/adminController.js';
import { showRouter } from './showRoutes.js';
import { getAllshowsController } from '../controllers/showController.js';
import { AdminValidate, protectAdmin } from '../middleware/protectAdmin.js';
export let adminRouter=express.Router();
adminRouter.post('/signUp',AdminValidate,adminSignUpController);
adminRouter.post('/signIn',AdminValidate,adminSignInController);
adminRouter.get("/dashboard",protectAdmin,getDashBoardController)
adminRouter.get("/allshows",protectAdmin,getAllShows);
adminRouter.get('/allbookings',protectAdmin,getAllBookings)
adminRouter.use("/auth",protectAdmin,(req,res)=>{

    res.json(req.admin)
})

