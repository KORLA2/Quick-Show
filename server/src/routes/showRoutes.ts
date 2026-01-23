import express from "express";
import { addShowController, getNowPlayingMovies } from "../controllers/showController.js";


export let showRouter=express.Router();

showRouter.get("/now-playing",getNowPlayingMovies);
showRouter.post("/addshow",addShowController);