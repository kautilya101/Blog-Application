import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import BlogList from "./components/blog/BlogList"
import BlogItem from "./components/blog/BlogItem"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import ErrorPage from "./components/ErrorPage"
import Home from "./components/Home"
import PersonalBlogs from "./components/blog/PersonalBlogs"
import BlogProvider from "./context/BlogContextProvider"
import BlogDetails from "./components/blog/BlogDetails"
import SearchBlog from "./components/blog/SearchBlog"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout/>} path="/">
          <Route index element={<Home/>}/>
          <Route element={<BlogDetails/>} path="/posts/:id"/>
          <Route path="/user/blogs" element={<PersonalBlogs/>} />
          <Route element={<SearchBlog/>} path="/search" />
        </Route>
        <Route element={<SignIn/>} path="/login" />
        <Route element={<SignUp/>} path="/register" />
        <Route path={'*'} element={<ErrorPage/>} />
      </>
    )
  )

  return (
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  )
}

export default App
