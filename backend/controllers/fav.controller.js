import { fetchfromDB } from "../services/tmdb.services.js";
import User from "../models/user.js";

export async function addToFavourites(req, res) {
    try { 
        const account_id = req.user._id;
        const data = await fetchfromDB(`https://api.themoviedb.org/3/account/${account_id}/favorite`);
        
        // Check if results exist and handle multiple results if necessary
        if (!data.results || data.results.length === 0) {
            return res.status(404).send(null);
        }
        
        // If results is an array, process each item
        const favorites = data.results.map(item => ({
            id: item.id,
            image: item.profile_path || item.poster_path,
            title: item.name || item.title,
            createdAt: new Date(),
        }));
        
        // Update user's favorites list in the database
        await User.findByIdAndUpdate(req.user._id, {
            $push: { myFav: { $each: favorites } }
        });
    
        return res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }        
}



export async function getFavourites(req,res){
    try{
        const data= await fetchfromDB(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies`)
        return res.status(200).json({success:true, content:req.user.myFav});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, message:'Internal server error'});
    }
}