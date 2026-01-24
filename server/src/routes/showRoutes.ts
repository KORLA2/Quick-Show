import express from "express";
import { addShowController, getNowPlayingMovies } from "../controllers/showController.js";
import {protectAdmin} from "../middleware/protectAdmin.js"

export let showRouter=express.Router();

showRouter.get("/now-playing",protectAdmin,getNowPlayingMovies);
showRouter.post("/addshow",protectAdmin,addShowController);