import {useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";

export const Persons = () => {
  const {id}=useParams();
  const[person,setPerson]=useState([]);
  const[loading,setLoading]=useState(true);
  // const[details,setDetails]=useState([]);

  useEffect(() => {
		const getPerson = async () => {
			try {
				const res = await axios.get(`/api/actor/details/${id}`);
				setPerson(res.data.content);
			} catch (error) {
                console.log(error.message);
                setPerson([]);
			}finally{
        setLoading(false);
      }
		};
		getPerson();
	}, [id]);

  // useEffect(() => {
	// 	const getDetails = async () => {
	// 		try {
	// 			const res = await axios.get(`/api/actor/combined/${id}`);
	// 			setPerson(res.data.content);
	// 		} catch (error) {
  //               console.log(error.message);
  //               setDetails([]);
	// 		}
	// 	};
	// 	getDetails();
	// }, []);

  if(loading){
    return(
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton/>
    </div>);
    }

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <h1 className='text-3xl font-bold mb-8 flex justify-center text-white'>{person?.name}</h1>
			<div className='mx-auto container px-4 py-8 h-full flex justify-center'>
        <img
						src={ORIGINAL_IMG_BASE_URL + person?.profile_path}
						alt='Poster image'
						className='max-h-[500px] rounded-md flex justify-center items-center'
					/>
      </div>
      <h2 className="text-1xl">{person?.biography}</h2>
     </div> 
  );
}
