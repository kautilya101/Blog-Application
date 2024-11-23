import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BlogContext } from '../../context/BlogContextProvider';
import { TBlog, TComment } from '../../types/types';
import { nameInitials,formatDate,formatTime } from '../../utils/utils'
import { FaArrowRight } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
export default function BlogDetails() {

  const {blogs,addComment} = useContext(BlogContext)!;
  const [blog,setBlog] = useState<TBlog>();
  const [comment, setComment] = useState('')
  const {id} = useParams();
  
  useEffect(() => {
    setBlog(blogs.find((blog) => blog.id === Number(id)));

  },[id,blogs]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setComment(e.target.value)
  }

  const handleCommentSent = () => {
    if(comment != ''){
      addComment(comment,blog?.id!)
      setComment('')
    }
  }



  return (
    <div className="list-width">
     { 
     blog &&
     <div className='flex flex-col p-3 space-y-3 flex-1'>
      <div className="flex items-center gap-2"> {/* image and name */}
        <div className="bg-secondary overflow-hidden text-background rounded-full flex items-center justify-center w-10 h-10">
          <span className="text-center">
          {nameInitials(blog.author.username)}
          </span>
        </div>
        <span>{blog.author.username}</span>
      </div>
      <div className=" space-y-3"> {/* heading and content */}
        <span className='text-xl sm:text-2xl font-semibold text-text'>{blog.title[0].toUpperCase()+blog.title.slice(1)}</span>
        <div className="text-sm sm:text-base cursor-pointer text-text/90">
          {blog?.content}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between text-sm text-text/70">{/* created data and view count */}
        <span className=''>
          Published on: {formatTime(blog?.createdAt!) +", "+formatDate(blog?.createdAt!)}
        </span>
        <div className="flex items-center gap-3">
          <span className='inline-flex items-center gap-1'>
              <FiEye /> {blog?.viewCount}
          </span>
        </div>
      </div>

      {/* add comment */}
      <div className=" flex items-center gap-3"> 
        <input
          className='rounded-3xl p-2 px-4 border border-secondary/60  w-full'
          type='text'
          value={comment}
          onChange={(e) => {handleCommentChange(e)}}
          placeholder='Add a comment'
        />
        <FaArrowRight className='text-secondary cursor-pointer hover:text-black' onClick={handleCommentSent}/>
      </div>
      </div> 
    }

     {/* comments */}
    <div className="list-width my-5 h-[1px] bg-black/30 w-full"></div>
    <div className="flex space-y-4 flex-col justify-center">
      <h1 className="text-xl text-text font-semibold">
        {" "}Comments ({blog?.comments.length})
      </h1>
        {blog?.comments.length! > 0 && 
          <div className="flex flex-col gap-6 ">
            {blog?.comments.map((comment) => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </div>
        }
    </div>  
    </div>
  )
}

const Comment = ({comment} : {comment: TComment}) => {
  return (
    <div className="flex flex-col justify-center gap-1">
      {/* dp username  and comment*/}
      <div className="flex flex-row gap-4 items-center w-full"> 
        <div className="bg-secondary overflow-hidden text-background rounded-full flex items-center justify-center w-10 h-10">
          <span className="text-center">
            {nameInitials(comment.author.username!)}
          </span>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <span className='font-semibold text-sm'>{comment.author.username}</span>
          <span className=''>{comment.content}</span>
        </div>
      </div>
      <div className="text-sm text-text/50">
        {formatTime(comment.createdAt) + " , " + formatDate(comment.createdAt)}
      </div>
    </div>
  )
}
