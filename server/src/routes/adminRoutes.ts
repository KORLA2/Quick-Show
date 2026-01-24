import express from 'express'
import { Validate } from '../middleware/auth.js';
import { adminSignInController, adminSignUpController } from '../controllers/adminController.js';
import { showRouter } from './showRoutes.js';
export let adminRouter=express.Router();
adminRouter.post('/signUp',Validate,adminSignUpController);
adminRouter.post('/signIn',Validate,adminSignInController);
adminRouter.use("/show",showRouter)

