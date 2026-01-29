import express from "express";
import { addShowController, getAllshowsController, getNowPlayingMovies, getShowController } from "../controllers/showController.js";
import {protectAdmin} from "../middleware/protectAdmin.js"

export let showRouter=express.Router();

showRouter.get("/now-playing",getNowPlayingMovies);
showRouter.post("/addshow",protectAdmin,addShowController);
showRouter.get("/allshows",protectAdmin,getAllshowsController);
showRouter.get("/:movieID",protectAdmin,getShowController);

