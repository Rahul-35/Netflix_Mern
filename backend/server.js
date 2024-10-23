import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";

import dotenv from 'dotenv';
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173/' }));

const PORT=ENV_VARS.PORT;

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
    connectDB();
})

app.use("/api/auth",authRoute);
app.use("/api/movie",protectRoute,movieRoute);
app.use("/api/tv",protectRoute,tvRoute);
app.use("/api/search",protectRoute,searchRoute);