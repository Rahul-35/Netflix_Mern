import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const MyList = () => {

  const [myFav,setMyFav]=useState([]);

  useEffect(() => {
		const getMyFav = async () => {
			try {
				const res = await axios.get('/api/favourite/getfav');
				setMyFav(res.data.content);
			} catch (error) {
                console.log(error.message);
                setMyFav([]);
			}
		};
		getMyFav();
	}, []);

	function formatDate(dateString) {
        // Create a Date object from the input date string
        const date = new Date(dateString);
    
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        // Extract the month, day, and year from the Date object
        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
    
        // Return the formatted date string
        return `${month} ${day}, ${year}`;
    }

if (myFav?.length === 0) {
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>My Favourites</h1>
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl'>No Favourites added so far</p>
        </div>
      </div>
    </div>
  );
}

const handleDelete = async (entry) => {
	try {
		await axios.delete(`/api/favourite/delfav/${entry.id}`);
		setMyFav(myFav.filter((item) => item.id !== entry.id));
	} catch (error) {
		console.log(error.message);
		toast.error("Failed to delete search item");
	}
};

  return (
    <div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>My Favourites</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
					{myFav?.map((entry) => (
						<div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
							<Link to={"/watch/" + entry.id}>
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='Favourite image'
								className='size-16 rounded-full object-cover mr-4'
							/>
							<div className='flex flex-col'>
								<h2 className='text-white text-lg hover:underline cursor-pointer'>{entry.title}</h2>
								<span>{formatDate(entry.createdAt)}</span>
							</div>
							</Link>
							<Trash
									className='size-5 ml-4 right-6 cursor-pointer hover:fill-red-600 hover:text-red-600'
									onClick={() => handleDelete(entry)}
								/>
						</div>
					))}
				</div>
			</div>
		</div>
  )
}

export default MyList