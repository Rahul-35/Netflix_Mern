import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB= async() =>{
    try{
        const conn= await mongoose.connect(ENV_VARS.MON_URI);
        console.log("Host connected: "+conn.connection.host);
    }
    catch(error){
            process.exit(1);
    }
}