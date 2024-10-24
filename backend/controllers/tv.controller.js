import { fetchfromDB } from "../services/tmdb.services.js";

export async function getTrendingShows(req,res){
    try{
        const data= await fetchfromDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomshow=await data.results[Math.floor(Math.random()*data.results?.length)];
        return res.status(200).json({success:true, content:randomshow});
    }
    catch(error){
        return res.status(500).json({success:true, message:'Internal server error'});
    }
}

export async function getShowTrailers(req,res){
    const {id}=req.params;
    try{
        const data=await fetchfromDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.status(200).json({success:true, trailers:data.results});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Trailer not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function getShowDetails(req,res){
    const {idx}=req.params;
    try{
        const data=await fetchfromDB(`https://api.themoviedb.org/3/tv/${idx}?language=en-US`);
        return res.status(200).json({success:true, content:data});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Show details not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function getSimilarShows(req,res) {
    try{
        const {id}=req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({success:true, similar:data.results});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Show details not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function getShowsByCategory(req,res) {
    try{
        const {category}= req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(200).json({success:true, content:data.results});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Show details not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
    
}