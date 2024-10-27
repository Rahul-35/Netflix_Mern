import User from "../models/user.js";
import { fetchfromDB } from "../services/tmdb.services.js";

export async function searchPerson(req,res) 
{
    try{
        const {query}=req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        
        if(data.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id: data.results[0].id,
                    image:data.results[0].profile_path,
                    title:data.results[0].name,
                    searchType:"Person",
                    createdAt:new Date(),
                }
            }
            });

        return res.status(200).json({success:true, content:data.results});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }    
}

export async function searchMovie(req,res) {
    try{
        const {query}=req.params;
        const response=await fetchfromDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id: response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"Movie",
                    createdAt:new Date(),
                }
            }
            });
            return res.status(200).json({success:true, content:response.results});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function searchTV(req,res) {
    try{
        const {query}=req.params;
        const response=await fetchfromDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id: response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"TV",
                    createdAt:new Date(),
                }
            }
            });
            return res.status(200).json({success:true, content:response.results});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function getSearchHistory(req,res){
    try{
        return res.status(200).json({success:true, content:req.user.searchHistory});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function removeItemfromHistory(req,res) {
    try{
        var {id}=req.params;
        id=parseInt(id);
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id},
            }
        });
        return res.status(200).json({success:true, message:'The item is deleted from history'});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}