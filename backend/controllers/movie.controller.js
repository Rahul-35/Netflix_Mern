import { fetchfromDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req,res) {
    try{
        const data = await fetchfromDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie= await data.results[Math.floor(Math.random()*data.results?.length)];

        return res.json({success:true, content:randomMovie});
    }
    catch(error){
        return res.status(500).json({success:false, message: "Internal server error"});
    }
}


export async function getMovieTrailers(req,res) {
    try{
        const {id}=req.params;
        const data = await fetchfromDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        return res.status(200).json({success:true, trailers:data.results});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Movie not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
    
}

export async function getMovieDetails(req,res) {
    try{
        const {id}=req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        return res.status(200).json({sucess:true, content:data});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Movie not found'});
        }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function getSimilarMovies(req,res){
    const {id}=req.params;
    try{
        const data= await fetchfromDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({success:true, similar:data.results });
    }
    catch(error){
        if(error.message.includes("404")){
           return res.status(404).json({success:false, message:'Movie not found'});
        }
       return res.status(500).json({success:false, message:'Internal server error'});
    }
}


export async function getMoviesByCategory(req,res){
    const {category}= req.params;
    try{
        const data= await fetchfromDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        return res.status(200).json({success:true, content:data.results });
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Movies not found'});
         }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}
