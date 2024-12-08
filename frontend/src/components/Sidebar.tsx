import { ReactNode } from 'react'
import { GoHome } from "react-icons/go";
import { MdDynamicFeed } from "react-icons/md";
import { RiSearchLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

const SidebarIcon = ({icon,label,path}: {icon:ReactNode,label: string, path:string}) => {

  return (
    <Link to={path}>
      <div className={"sidebar-icon group"}>
            {icon}
          <span className='sidebar-tooltip group-hover:scale-100'>
          {label}
        </span>
        </div>    
  </Link>
  )
}

export default function Sidebar() {
  return (
    <div className='top-0 left-0 w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg'>
        {SideIcons.map((sideIcon,index) => (
          <SidebarIcon key={`${sideIcon.label}+${index+1}`} icon={sideIcon.icon} label={sideIcon.label} path={sideIcon.path} />
        ))}
    </div>
  )
}

const SideIcons = [
  { 
    label: 'Home',
    icon: <GoHome className='w-6 h-6' />,
    path: '/'
  },
  {
    label: 'Create',
    icon: <MdDynamicFeed className='w-6 h-6' />,
    path: '/user/blogs'
  },
  {
    label: "Search",
    icon: <RiSearchLine className='w-6 h-6' />,
    path: '/search'
  }
]