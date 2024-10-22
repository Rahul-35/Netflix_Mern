import { useEffect, useState } from "react"
import { useContentStore } from "../store/content.js";
import axios from "axios";


export const useGetTrendingContent=()=>{
    const [trendingContent,setTrendingContent]=useState("");
    const {contentType}=useContentStore();

    useEffect(()=>{
        const getContent= async ()=> { 
        const res=await axios(`/api/${contentType}/trending`);
        setTrendingContent(res.data.content);
         };
        getContent();
    },[contentType]);

    return {trendingContent};
}