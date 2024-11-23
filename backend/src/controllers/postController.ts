import postRepo from "../repos/postRepo"
import { Request,Response } from "express"

const getAllPosts = async(req:Request, res: Response) => {
  
  try{
    const posts = await postRepo.getAllPosts();
    res.status(200).json({success: true,posts: posts});
  }
  catch(e){
    res.status(500).json({error: 'Error while getting posts'})
  }
}

const getAllUserPosts = async(req:Request, res: Response) => {
  
  const { id:userId } = req.user!;
  try{
    const posts = await postRepo.getAllUserPosts(userId); 
    res.status(200).json({success: true,posts: posts});
  }
  catch(e){
    res.status(500).json({error: 'Error while getting posts'})
  }
}

const getPost = async(req:Request, res: Response) => {
  const { id } = req.params;
  try{
    const posts = await postRepo.getPost(id);
    res.status(200).json({success:true,posts:posts});
  }
  catch(e){
    res.status(404).json({error: 'No post found'})
  }
}

const createPost = async(req:Request, res: Response) => {
  const {title,content} = req.body;
  const { id:userId } = req.user!;
  try{
    const createdPost = await postRepo.createPost(title,content,userId);
    console.log(createdPost)
    res.status(201).json({success:true, posts: createdPost})

  }catch(e){
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const updatePost = async(req:Request, res: Response) => {
  const { id } = req.params;
  const {title,content} = req.body;
  const { id:userId } = req.user!;
  try{
    const updatedPost = await postRepo.updatePost(id,title,content,userId);
    console.log(updatedPost)
    res.status(200).json({success:true,posts: updatedPost, message: 'post updated successfully'});
  }catch(e){
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const deletePost = async(req:Request, res: Response) =>{
  const { id } = req.params;
  const { id:userId } = req.user!;

  try{
    const deletedPost = await postRepo.deletePost(id,userId);
    res.status(200).json({success:true, message: 'post deleted successfully'});
  }catch(e){
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const addComment = async(req:Request, res:Response) => {
  const { content,postId } = req.body;
  const { id:userId } = req.user!;
  try{
    const response = await postRepo.addComment(content,Number(postId),userId);
    console.log( response);
    res.status(200).json({success:true, message: 'comment added successfully'});
  }catch(e){
    res.status(500).json({error: 'Error while adding comment'+ e});
  }

}
const viewCount = async(req:Request, res:Response) => {
  const { postId } = req.body;
  const { id:userId } = req.user!;
  try{
    const response = await postRepo.viewCount(Number(postId),userId);
    res.status(200).json({success:true, message: 'view increased successfully'});
  }catch(e){
    res.status(500).json({error: 'Internal Server Error'});
  }
}

export default {
  getAllPosts,
  getAllUserPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost,
  addComment,
  viewCount

}

