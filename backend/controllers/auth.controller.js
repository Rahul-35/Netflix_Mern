import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { generateTokenAndCookie } from "../utils/generateTokens.js";

export async function signup(req,res) {
    try{
        const {username,password,email}=req.body;

        if(!email || !password || !username){
            return res.status(400).json({success:false, message:'Please fill all details'});
        }
    
        const emailRegex= /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
        if (!emailRegex.test(email)){
             return res.status(400).json({success:false, message:"Invalid email"});
        }
        if(password.length <6){
            return res.status(400).json({success:false, message:"password should be at least 6 characters long"});
        }
        const existingUserByEmail= await User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false, message:"Email already exists"});
        }

        const existingUserByUsername= await User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false, message:"username already exists"});
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const PROFILE_PICS= ["/avatar1.png","/avatar2.png","/avatar3.png"];
        const image= PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];

        const newUser=new User({email,password: hashedPassword,username,image});

        generateTokenAndCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({success:true, user: {
            ...newUser._doc,
            password: "",
        },});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export async function login(req,res) {
    try{
        const {username,password} =req.body;
        if(!username || !password){
            res.status(400).json({success:false, message: "All fields are required"});
        }

        const user=await User.findOne({username:username});
        if(!user){
            res.status(404).json({success:false, message: "Invalid Credentials"});
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect){
            res.status(404).json({success:false, message: "Invalid Credentials"});
        }

        generateTokenAndCookie(user._id,res);
        res.status(200).json({success:true, user: {
            ...user._doc,
            password: "",
        },});

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}

export async function logout(req,res) {
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message:"User logged out successfully"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}

export async function authCheck(req, res) {
	try {
		//console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}