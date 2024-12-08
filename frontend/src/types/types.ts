import { Dispatch } from "react";

export type methodType = 'get' | 'post' | 'put' | 'delete';

export type TUpdateValue = {
  id: number
  title:string
  content:string
}

export type BlogContextType = {
  blogs: TBlog[];
  user: User | undefined;
  personalBlogs: TBlog[];
  updateValue: TUpdateValue | undefined
  getAllBlogs:() => void;
  getAllPersonalBlogs:() => void;
  getBlog:(id:number) => void;
  deleteBlog:(id:number) => void;
  setUpdateValue: Dispatch<React.SetStateAction<TUpdateValue| undefined>>
  updateBlog:(updatedBlog: TUpdateValue) => void;
  createBlog:(title:string,content:string) => void;
  addComment:(content:string,postId:number) => void;
  increaseViewCount:(postId:number) => void;
  searchBlog:(title: string) => TBlog[];
  setUserToken: (token:string) => void
  loading: boolean;
  error: unknown | null;
}

export type TComment = {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
  userId: number;
  post: TBlog
  postId : number
  parent: TComment
  parentid: number
  replies: TComment[] 
}

export type TBlog = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments: TComment[];
  viewCount: number; 
  author: User;
  userId: number;
}

export type User = {
  id: number;
  username: string;
  email:string;
}
