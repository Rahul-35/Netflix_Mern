import express from "express";
import { addToFavourites, getFavourites } from "../controllers/fav.controller.js";


const router=express.Router();

router.get("/favourite",getFavourites);
router.post("/favourite/:account_id",addToFavourites);

export default router;