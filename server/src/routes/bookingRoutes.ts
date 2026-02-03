import express from "express";
import { createBookingController, getOccupiedSeats } from "../controllers/bookingController.js";
import { Protect } from "../middleware/auth.js";

export let bookingsRouter=express.Router();

bookingsRouter.post('/create',Protect,createBookingController);
bookingsRouter.get("/seats/:showId/:theaterID",getOccupiedSeats)
