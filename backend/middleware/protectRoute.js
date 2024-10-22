import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute= async (req,res,next) =>{
    try{
        const token= req.cookies["jwt-netflix"];

        if(!token){
            return res.status(401).json({success:false, message:"Unauthorized - No Token provided"});
        }

        const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false, message:"Unauthorized - Token not valid"});
        }
        const user= await User.findById(decoded.userID).select("-password");
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }

        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in protect middleware ",error.message);
        res.status(500).json({success:true, message:"Internal server error"});
    }
}