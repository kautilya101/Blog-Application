import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from './Header'
import { FaSpinner } from 'react-icons/fa'

export default function Layout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
    else{
      setIsAuthenticated(true);
    }
  }, []);

  if(!isAuthenticated){
    return <FaSpinner className='animate-spin' />
  }

  
  return (
    <div className='flex flex-col min-h-screen '>
      <Header/>
      <div className="flex w-full flex-1"> 
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  )
}
