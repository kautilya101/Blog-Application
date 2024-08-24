
import prisma from "../lib/prisma";

export const signInUser = async(email: string) => {
  return await prisma.user.findUnique({
    where:{
      email: email
    }
  });
};

const signUpUser = async (username:string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};


const getAllPosts = async() => {
  return await prisma.post.findMany({
    include:{
      author:  true,
      comments: {
        include:{
          author: true
        }
      },
    }
  });
};

const getAllUserPosts = async(id: string) =>{
  return await prisma.post.findMany({
    where:{
      userId: Number(id),
    },
    include:{
      author:  true,
      comments: {
        include:{
          author: true
        }
      },
    }
  })
}

const getPost = async(post_id: string) => {
  return await prisma.post.findUnique({
    where:{
      id: Number(post_id)
    },
    include:{
      author:  true,
      comments: {
        include:{
          author: true
        }
      },
    }
  })
};

const createPost = async(title: string,content: string,id: number) => {
  return await prisma.post.create({
    data:{
      title: title,
      content: content,
      userId: Number(id)
    },
    include:{
      author:true,
      comments: {
        include:{
          author: true
        }
      },
    }
  })
};

const updatePost = async(postId: string,title: string,content: string,userId: number) => {
  return await prisma.post.update({
    where:{
      userId: userId,
      id: Number(postId)
    },
    data:{
      title: title,
      content
    },
    include:{
      author:  true,
      comments: {
        include:{
          author: true
        }
      },
    }
  })
};

const deletePost = async(postId: string,userId: number) => {
  return await prisma.post.delete({
    where:{
      userId: userId,
      id: Number(postId)
    }
  })
};

const addComment = async(content:string, postId:number, userId:number) => {
  return await prisma.comment.create({
    data: {
      content: content,
      userId: userId,
      postId: postId,
    }
  });
}

const viewCount = async(postId:number, userId:number) => {
  return await prisma.post.update({
    where: {
        id: Number(postId),
        userId: userId
    },
    data:{
      viewCount: {
        increment : 1,
      }
    }
  })
}

export default {
  signInUser,
  signUpUser,
  getAllPosts,
  getAllUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  viewCount,
  addComment
};
