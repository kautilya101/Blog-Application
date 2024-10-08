import { useContext, useEffect } from "react";
import { BlogContext } from "../../context/BlogContextProvider";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";

export default function PersonalBlogs() {
  const context = useContext(BlogContext);



  const { getAllPersonalBlogs, loading, user, personalBlogs } = context!;

  useEffect(() => {
    getAllPersonalBlogs();
  }, [user]);


  return (
    <div className="w-full mb-5">
      <CreateBlog />
      <div className=" list-width mx-auto my-5 h-[1px] bg-black/30"></div>
      { personalBlogs.length > 0 
        ? <BlogList blogs={personalBlogs} loading={loading} blogtype={"user"} />
        : 
          <div className="list-width flex items-center justify-center">
            You haven't posted anything.
          </div>
        } 
    </div>
  );
}
