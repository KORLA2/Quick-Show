import express from "express";
import { addShowController, getAllshowsController, getShowController } from "../controllers/showController.js";
import {protectAdmin} from "../middleware/protectAdmin.js"

export let showRouter=express.Router();

showRouter.post("/addshow",protectAdmin,addShowController);
showRouter.get("/allshows",getAllshowsController);
showRouter.get("/:movieID",getShowController);


