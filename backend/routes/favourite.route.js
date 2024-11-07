import express from "express";
import { addToFavourites, addTvtoFavourites, deleteFav, getFavourites } from "../controllers/fav.controller.js";


const router=express.Router();

router.get("/getfav",getFavourites);
router.get("/setfav/:id",addToFavourites);
router.get("/settv/:id",addTvtoFavourites);
router.delete("/delfav/:id",deleteFav);

export default router;