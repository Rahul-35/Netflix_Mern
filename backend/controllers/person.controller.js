import { fetchfromDB } from "../services/tmdb.services.js"

export async function personDetails(req,res){
    try{
        const {id}=req.params;
        const data=await fetchfromDB(`https://api.themoviedb.org/3/person/${id}?language=en-US`);
        return res.status(200).json({success:true, content:data});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Person not found'});
         }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function personCombined(req,res) {
    try{
        const {id}=req.params;
        const data=await fetchfromDB(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`);
        return res.status(200).json({success:true, content:data});
    }
    catch(error){
        if(error.message.includes("404")){
            return res.status(404).json({success:false, message:'Person not found'});
         }
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}