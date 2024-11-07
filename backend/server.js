import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";
import favRoute from "./routes/favourite.route.js";

import dotenv from 'dotenv';
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173' }));

const PORT=ENV_VARS.PORT;

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
    connectDB();
})


app.use(session({
    secret: ENV_VARS.JWT_SECRET, // Change to a secure, random key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 1000, // 5 minutes in milliseconds
        sameSite: 'lax', // Helps with CSRF protection
    },
    store: MongoStore.create({
        mongoUrl: ENV_VARS.MON_URI, // MongoDB connection
        collectionName: 'sessions',
        ttl: 1 * 60, // Session expiration in seconds (5 minutes)
    })
}));

app.use("/api/auth",authRoute);
app.use("/api/movie",protectRoute,movieRoute);
app.use("/api/tv",protectRoute,tvRoute);
app.use("/api/search",protectRoute,searchRoute);
app.use("/api/favourite",protectRoute,favRoute);
