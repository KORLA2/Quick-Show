import express from "express";
import { movieController } from "../controllers/movieController.js";

export let movieRouter=express.Router();

movieRouter.get("/:movieId/theaters",movieController)
