import express from "express";
import postController from "../controllers/postController";
import { verifyToken } from "../middleware/authMiddleware";


export const postRouter = express.Router();

postRouter.get('/posts',verifyToken,postController.getAllPosts) // getAllPosts
postRouter.post('/user-posts',verifyToken,postController.getAllUserPosts) // getAllUserPosts
postRouter.post('/posts/',verifyToken,postController.createPost)  // AddNewPost
postRouter.get('/posts/:id',verifyToken,postController.getPost) // getPost
postRouter.put('/posts/:id',verifyToken, postController.updatePost) // EditPost
postRouter.delete('/posts/:id', verifyToken,postController.deletePost) //DeletePost
postRouter.post('/posts/comment', verifyToken,postController.addComment) //addComment
postRouter.post('/posts/view-count', verifyToken,postController.viewCount) //viewcount