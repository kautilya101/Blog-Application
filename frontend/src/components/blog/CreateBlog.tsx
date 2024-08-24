import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { BlogContext } from '../../context/BlogContextProvider'

export default function CreateBlog() {

  const context = useContext(BlogContext)!;
  const {createBlog,updateBlog,updateValue,setUpdateValue} = context!
  const [title, setTitle] = useState("")
  const [content, setContent] = useState('')
  const [error,setError] = useState('')

  const handleTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setError('')
  }
  const handleContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setError('')
  }

  useEffect(() => {
    setTitle(updateValue?.title! || '')
    setContent(updateValue?.content! || '')
  },[updateValue])

  const handleCreateAndUpdateBlog = () => {
    if(updateValue){
      updateBlog({
        title: title,
        content: content,
        id: updateValue.id
      })
      return;
    }
    if(title != '' && content != ''){
      createBlog(title,content);
      setTitle('')
      setContent('')
    }
    else{
      setError('Invalid values at creation time')
    }
    
  }

  const handleCancelEdit = () => {
    setUpdateValue(undefined)
  }

  return (
    <div className='list-width'>
      <h1 className="text-xl text-text my-3 font-semibold">Write your blog</h1>
      <div className="flex flex-col justify-center space-y-3">
        <div className="flex flex-col">
          <label htmlFor="title" className="my-2 cursor-pointer font-semibold">Title</label>
          <input 
            id='title'
            className='w-full p-2 border border-black/20 focus:outline-black/50 rounded-lg' 
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="my-2 cursor-pointer font-semibold">Content</label>
          <textarea 
            id='content'
            className=' resize-none p-2 overflow-auto w-full h-32 md:h-48 border border-black/20 focus:outline-black/50 rounded-lg'
            value={content}
            onChange={(e) => handleContentChange(e)}
          />
        </div>
        {error && <span className='text-center text-red-700 text-sm'>{error}</span>}
        <div className="flex justify-between items-center">
        <button className='bg-secondary max-w-fit px-3 py-1.5 text-white rounded-sm ${}' onClick={handleCreateAndUpdateBlog}>
         {  updateValue ? 'Update' : 'Create'}
        </button>
        {updateValue && <button className='bg-secondary max-w-fit px-3 py-1.5 text-white rounded-sm ${}' onClick={handleCancelEdit}>
         Cancel
        </button>}
        </div>
        
      </div>

    </div>
  )
}
