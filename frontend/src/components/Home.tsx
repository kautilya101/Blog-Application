import { useContext } from 'react'
import { BlogContext } from '../context/BlogContextProvider';
import BlogList from './blog/BlogList';

export default function Home() {
  const {blogs,loading} = useContext(BlogContext)!;
  
  return (
    <div className='w-full'>
      <BlogList blogs={blogs} loading={loading} />
    </div>
  )
}
