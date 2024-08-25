import { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import useDebounce from '../../Hooks/useDebounce'
import { BlogContext } from '../../context/BlogContextProvider'
import { TBlog } from '../../types/types'
import BlogList from './BlogList'

export default function SearchBlog() {

  const {searchBlog,loading} = useContext(BlogContext)!
  const [value,setValue] = useState('')
  const [result,setResult] = useState<TBlog[]>([])
  const debounceValue = useDebounce(value,800);

  const handleSearchBlog = () => {
    const searchedBlogs = searchBlog(debounceValue);
    setResult(searchedBlogs);
  }


  return (
    <div className='flex flex-col gap-10 w-full'>
      <div className="list-width flex items-center gap-3 px-4 py-2"> 
        <input
          className='rounded-3xl p-2 px-4 border border-secondary/60  w-full focus:outline-black/50'
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Search a title'
        />
        <FaSearch className='text-secondary cursor-pointer hover:text-black' onClick={handleSearchBlog}/>
      </div>
        {result.length > 0 ? 
              <BlogList blogs={result} loading={loading}/>
              : 
              <span className="flex items-center justify-center w-full text-text p-4">
                No matches for searched value.
              </span>
        }

    </div>
    
  )
}
