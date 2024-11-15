import express from "express";
import { personCombined, personDetails } from "../controllers/person.controller.js";

const router=express.Router();

router.get("/details/:id",personDetails);
router.get("/combined/:id",personCombined);


export default router;