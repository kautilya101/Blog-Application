import React from 'react'
import { MdLogout } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


export default function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login');
  }

  return (
    <header className="w-full flex items-center justify-between bg-[#F0EDE5] mb-5">
        <div className="p-4 px-10 text-3xl font-bold text-[#6B705C] ">
          <Link to={'/'}>
            Wryt
          </Link>
        </div>
        <div className="mx-10 p-2 hover:bg-accent text-secondary hover:text-background transition-all duration-500 
              ease-linear hover:rounded-3xl rounded-sm flex items-center justify-center cursor-pointer" onClick={handleLogout}>
              <MdLogout className='w-5 h-5 '/>
        </div>
    </header> 
  )
}
