import {useState,useEffect, useRef} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Persons = () => {
  const {id}=useParams();
  const[person,setPerson]=useState([]);
  const[loading,setLoading]=useState(true);
  const[details,setDetails]=useState([]);
  const sliderRef = useRef(null);
  const [showArrows,setShowArrows]=useState(false);

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

  useEffect(() => {
		const getDetails = async () => {
			try {
				const res = await axios.get(`/api/actor/combined/${id}`);
				setDetails(res.data.content.cast);
			} catch (error) {
                console.log(error.message);
                setDetails([]);
			}
		};
		getDetails();
	}, [id]);

  if(loading){
    return(
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton/>
    </div>);
    }

    const scrollLeft = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
      }
    };
    const scrollRight = () => {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };

    function formatDate(dateString) {
      // Create a Date object from the input date string
      const date = new Date(dateString);
  
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
      // Extract the month, day, and year from the Date object
      const month = monthNames[date.getUTCMonth()];
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
  
      // Return the formatted date string
      return `${day} ${month}, ${year}`;
  }

  return (
    
    <div className="bg-black text-white relative px-5 md:px-20 "
    onMouseEnter={()=>{setShowArrows(true)}}
    onMouseLeave={()=>{setShowArrows(false)}}
    >
      <Navbar />
      <h1 className='text-3xl font-bold mb-8 flex justify-center text-white'>{person?.name}</h1>
			<div className='mx-auto container px-4 py-8 h-full flex justify-center'>
        <img
						src={ORIGINAL_IMG_BASE_URL + person?.profile_path}
						alt='Poster image'
						className='max-h-[500px] rounded-md flex justify-center items-center'
					/>
      </div>
      <h2 className='text-3xl font-bold mb-8 text-white'>About:</h2>
      <h2 className="text-2xl mb-4 font-serif">Date of Birth: {formatDate(person?.birthday)}</h2>
      <h2 className="text-1xl">{person?.biography}</h2>
      <div className=" mt-12 max-w-5xl mx-auto relative">
						<h3 className='text-3xl font-bold'>{person.name} Movies/TV Shows</h3>

						<div className='flex space-x-4 mt-4 overflow-x-scroll scrollbar-hide' ref={sliderRef} >
							{details.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}
      {showArrows && (
              <>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center
            size-12 rounded-full bg-red-400 bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center
            size-12 rounded-full bg-red-400 bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>)}
     </div> 
     </div> 
     </div> 
  );
}
