import express from "express";
import { getCredits, getMovie, getNowPlayingMovies, movieController } from "../controllers/movieController.js";

export let movieRouter=express.Router();

movieRouter.get("/:movieId/theaters",movieController);
movieRouter.get("/movies/all",getNowPlayingMovies);
movieRouter.get("/movie/:movieID/credits",getCredits);
movieRouter.get("/movie/:movieID",getMovie);
