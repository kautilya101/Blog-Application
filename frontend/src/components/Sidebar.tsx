import React, { ReactNode } from 'react'
import { GoHome } from "react-icons/go";
import { MdDynamicFeed } from "react-icons/md";
import { RiSearchLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

const SidebarIcon = ({icon,label}: {icon:ReactNode,label: string}) => {

  return (
    <div className={"sidebar-icon group"}>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
        {label}
      </span>
      </div>
      
  )
}

export default function Sidebar() {
  return (
    <div className='top-0 left-0 w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg'>
        {SideIcons.map((sideIcon,index) => (
          <SidebarIcon icon={sideIcon.icon} label={sideIcon.label} key={`${sideIcon.label}+${index+1}`} />
        ))}
    </div>
  )
}

const SideIcons = [
  { 
    label: 'Home',
    icon: <Link to={'/'}><GoHome className='w-6 h-6' /></Link>,
  },
  {
    label: 'Your Blogs',
    icon: <Link to={'/user/blogs'}><MdDynamicFeed className='w-6 h-6' /></Link>
  },
  {
    label: "Search",
    icon: <NavLink to={'/search'} ><RiSearchLine className='w-6 h-6' /></NavLink>
  }
]