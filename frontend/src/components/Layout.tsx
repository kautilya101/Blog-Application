import { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from './Header'

export default function Layout() {

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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
