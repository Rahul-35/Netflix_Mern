import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndCookie= (userID, res)=>{
    const token = jwt.sign({userID},ENV_VARS.JWT_SECRET,{expiresIn:'5d'});

    res.cookie("jwt-netflix",token,{
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly:true,   //prevent Xss attacks, we are making it unaccessible by JS
        sameSite:"strict",
        secure:ENV_VARS.NODE_ENV !== "development",
    });

    return token;
}