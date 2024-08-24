import { FaRegComment } from 'react-icons/fa'
import { FiEye } from 'react-icons/fi'
import { TBlog } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { nameInitials,formatDate,formatTime } from '../../utils/utils'
import { useContext } from 'react'
import { BlogContext } from '../../context/BlogContextProvider'

export default function BlogItem({blog}:{blog:TBlog}) {

  const navigate = useNavigate();
  const {increaseViewCount} = useContext(BlogContext)!;

  function handleBlogClick(id: number){
    increaseViewCount(id)
    navigate(`/posts/${id}`)
  }
  
  return (
    <div className='flex flex-col p-3 space-y-3 flex-1'>
      <div className="flex items-center gap-2"> {/* image and name */}
        <div className="bg-secondary overflow-hidden text-background rounded-full flex items-center justify-center w-10 h-10">
          <span className="text-center">
          {nameInitials(blog.author.username || "Anonymus")}
          </span>
        </div>
        <span>{blog.author.username || "Anonymus"}</span>
      </div>
      <div className=" space-y-3" onClick={() => handleBlogClick(blog.id)} > {/* heading and content */}
        <span className='text-xl sm:text-2xl font-semibold text-text'>{blog.title}</span>
        <div className="max-h-20 text-sm sm:text-base overflow-hidden cursor-pointer break-word text-text/90">
          {blog.content}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between text-sm text-text/70">{/* created data and view count */}
        <span className=''>
          Published on: {formatTime(blog.createdAt) +", "+formatDate(blog.createdAt)}
        </span>
        <div className="flex items-center gap-3">
          <span className='inline-flex gap-1 items-center'>
          <FaRegComment /> {blog.comments.length}
          </span>
          <span className='inline-flex items-center gap-1'>
              <FiEye /> {blog.viewCount}
          </span>
        </div>
      </div>

    </div>
  )
}
