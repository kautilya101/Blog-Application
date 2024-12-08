import BlogItem from "./BlogItem";
import { BiLoaderCircle } from "react-icons/bi";
import { TBlog, TUpdateValue } from "../../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BlogContext } from "../../context/BlogContextProvider";
import { useContext, useEffect } from "react";

type TBlogList = {
  blogs: TBlog[];
  loading: boolean;
  blogtype?: "user" | "all";
};

export default function BlogList({ blogs, loading, blogtype }: TBlogList) {
  const { deleteBlog, setUpdateValue, error, getAllBlogs } = useContext(BlogContext)!;

  const EditBlog = (updateBlog: TUpdateValue) => {
    setUpdateValue(updateBlog)
  };

  const DeleteBlog = (userId: number) => {
    deleteBlog(userId);
  };

  useEffect(() => {
    getAllBlogs();
    console.log("loading bloglist")
  },[]);


  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center">
          <BiLoaderCircle className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className=" w-11/12 sm:max-xl:w-2/3 xl:w-1/2 mx-auto flex flex-col justify-center gap-8">
          {blogtype === "user" && (
            <h1 className="text-xl text-text font-semibold">
              {" "}
              Your Collection
            </h1>
          )}
          {blogtype === "user"
            ? blogs.map((blog) => (
                <div key={blog.id} className="flex flex-col sm:flex-row gap-2 ">
                  <BlogItem key={blog.id} blog={blog} />
                  <div className="flex sm:flex-col justify-between items-center ">
                    <div
                      className="text-gray-700 cursor-pointer p-3 hover:bg-accent hover:text-background rounded-3xl "
                      onClick={() => EditBlog({title: blog.title,content:blog.content,id:blog.id})}
                    >
                      <CiEdit className="w-5 h-5" />
                    </div>
                    <div
                      className="text-red-700 cursor-pointer p-3 hover:bg-accent hover:text-background rounded-3xl"
                      onClick={() => DeleteBlog(blog.id)}
                    >
                      <MdDeleteOutline className="w-5 h-5 " />
                    </div>
                  </div>
                </div>
              ))
            : blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
        </div>
      )}
      {error ? 
        <div className="text-center">
          {JSON.stringify(error)} 
        </div> : ""
      }
    </div>
  );
}
