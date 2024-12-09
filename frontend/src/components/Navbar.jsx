import { Link } from "react-router-dom"
import { useState } from "react";
import {Search,  LogOut, Menu, Bell} from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const {setContentType} = useContentStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
            <Link to={"/"}>
                <img src="/netflix-logo.png" className="w-32 sm:w-40"/>
            </Link>
            {/* Desktop navbar */}
            <div className="hidden sm:flex gap-7 items-center">
            		<Link to='/' className='hover:underline hover:text-red-500 focus:text-red-600 focus:font-bold focus:text-lg' onClick={()=>setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline hover:text-red-500 focus:text-red-600 focus:font-bold focus:text-lg'onClick={()=>setContentType("tv")}>
						TV Shows
					</Link>
					<Link to='/history' className='hover:underline hover:text-red-500 focus:text-red-600 focus:font-bold focus:text-lg'>
						Search History
					</Link>
					<Link to='/favourite' className='hover:underline hover:text-red-500 focus:text-red-600 focus:font-bold focus:text-lg'>
						My List
					</Link>
				</div>
            </div>

            <div className='flex gap-6 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<Bell className='size-6 cursor-pointer'/>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>
            {/* mobile navbar items */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						TV Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
					<Link to={"/favourite"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						My List
					</Link>
				</div>
			)}
    </header>
  )
}

export default Navbar