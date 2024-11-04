import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";

const MyList = () => {

  const [myFav,setMyFav]=useState([]);


  useEffect(() => {
		const getMyFav = async () => {
			try {
				const res = await axios.get(`/api/favourite`);
				setMyFav(res.data.content);
			} catch (error) {
                console.log(error.message);
                setMyFav([]);
			}
		};
		getMyFav();
	}, []);

if (myFav?.length === 0) {
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>My Favourties</h1>
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl'>No Favourites added so far</p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>Search History</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
					{myFav?.map((entry) => (
						<div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='History image'
								className='size-16 rounded-full object-cover mr-4'
							/>
							<span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									entry.searchType === "Movie"
										? "bg-red-600"
										: entry.searchType === "TV"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
								{entry.searchType}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
  )
}

export default MyList