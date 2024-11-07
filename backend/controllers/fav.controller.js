import { fetchfromDB } from "../services/tmdb.services.js";
import User from "../models/user.js";

export async function addToFavourites(req, res) {
    //console.log("id: ",id);
    try { 
        const {id} = req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        console.log(data);

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                myFav:{
                    id: data.id,
                    image:data.poster_path,
                    title:data.title || data.results.name,
                    createdAt:new Date(),
                }
            }
            });
    
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }        
}

export async function addTvtoFavourites(req, res) {
    //console.log("id: ",id);
    //https://api.themoviedb.org/3/tv/series_id?language=en-US
    try { 
        const {id} = req.params;
        const data= await fetchfromDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        console.log(data.id);

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                myFav:{
                    id: data.id,
                    image:data.poster_path,
                    title:data.name,
                    createdAt:new Date(),
                }
            }
            });
    
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }        
}


export async function getFavourites(req,res){
    try{
        return res.status(200).json({success:true, content:req.user.myFav});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}

export async function deleteFav(req,res) {
    try{
        var {id}=req.params;
        id=parseInt(id);
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                myFav:{id:id},
            }
        });
        return res.status(200).json({success:true, message:'The item is deleted from Favourites'});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}