import { createContext, ReactNode, useEffect, useState } from "react";
import { BlogContextType, TBlog, TUpdateValue, User } from "../types/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);

export default function BlogProvider({ children }: { children: ReactNode }) {
  const url = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("token") || "";

  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [updateValue, setUpdateValue] = useState<TUpdateValue | undefined>()
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>();
  const [personalBlogs, setPersonalBlogs] = useState<TBlog[]>([]);

  const getUser = () => {
    setLoading(true);
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token) as User;
        setUser(decodedToken);
        setError(null);
      } catch (error) {
        setError("Error while getting user details");
      } finally {
        setLoading(false);
      }
    }
  };

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url + "/api/posts", {
        headers: { Authorization: token },
      });
      const data = await response.json();
      setBlogs(data.posts || []);
      setError(null);
    } catch (e) {
      setError("Error while Fetching at the time.");
    } finally {
      setLoading(false);
    }
  };

  const getAllPersonalBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url + "/api/user-posts", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPersonalBlogs(data.posts);
      setError(null);
    } catch (e) {
      setError("Error while Fetching at the time.");
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(url + `/api/posts/${id}`, {
        headers: { Authorization: token },
      });
      const data = await response.json();
      setError(null);
      if (data.success) return data.posts;
    } catch (err) {
      setError("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (title: string, content: string) => {
    try {
      const response = await fetch(url + "/api/posts", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const createdBlog = await response.json();
      setError(null);
      setBlogs([createdBlog.posts, ...blogs ]);
      setPersonalBlogs((prev) => [createdBlog.posts, ...prev]);
    } catch (err) {
      setError("Failed to create blog");
    }
  };

  const updateBlog = async (updatedBlog: TUpdateValue) => {
    setLoading(true);
    try {
      const response = await fetch(url + `/api/posts/${updatedBlog.id}`, {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      const savedBlog = await response.json();

      setError(null);
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === savedBlog.posts.id ? savedBlog.posts : blog))
      );
      setPersonalBlogs((prev) =>
        prev.map((blog) => (blog.id === savedBlog.posts.id ? savedBlog.posts : blog))
      );
    } catch (err) {
      setError("Failed to update blog");
    }
    finally{
      setLoading(false);
    }
  };

  const deleteBlog = async (id: number) => {
    try {
      await fetch(url + `/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setPersonalBlogs((prev) => prev.filter((blog) => blog.id != id));
      setError(null);
    } catch (err) {
      setError("Failed to delete blog");
    }
  };

  const addComment = async (content: string, postId: number) => {
    setLoading(true)
    try {
      await fetch(url + "/api/posts/comment", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId }),
      });
      setError(null);
    } catch (err) {
      setError("Failed to create blog");
    }
    finally{
      setLoading(false);
    }
  };

  const increaseViewCount = async (postId: number) => {
    try {
     await fetch(url + "/api/posts/view-count", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      setError(null);
    } catch (err) {
      setError("Failed to create blog");
    }
  };

  const searchBlog = (title: string) => {
    const matchResult = blogs.filter((blog) => {
      if(blog.title.toLowerCase().includes(title.toLowerCase()))
        return blog
    }
  )
  return matchResult || []
  };

  useEffect(() => {
    getAllBlogs();
    getUser();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        user,
        personalBlogs,
        updateValue,
        setUpdateValue,
        createBlog,
        getAllBlogs,
        getAllPersonalBlogs,
        getBlog,
        deleteBlog,
        updateBlog,
        addComment,
        increaseViewCount,
        searchBlog,
        loading,
        error,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
