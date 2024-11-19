import express from "express";
import { getShowDetails, getShowsByCategory, getShowTrailers, getSimilarShows, getTrendingShows, getTvCredits } from "../controllers/tv.controller.js";


const router=express.Router();

router.get('/trending',getTrendingShows);
router.get("/:id/trailers",getShowTrailers);
router.get("/:idx/details",getShowDetails);
router.get("/:id/similar",getSimilarShows);
router.get("/:category",getShowsByCategory);
router.get("/credits/:id",getTvCredits);


export default router;