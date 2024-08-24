import postRepo from "../repos/postRepo"
import { Request,Response } from "express"
import bcrypt from 'bcrypt'
import { signInSchema, signUpSchema } from "../lib/schema"
import jwt from 'jsonwebtoken';

const signInUser = async(req:Request, res:Response) => {
  const {email,password} = req.body;
  const parsed = signInSchema.parse({email: email,password: password});
  try{
    const user = await postRepo.signInUser(parsed.email);
    if(!user){
      return res.status(401).json({error: 'Authentication failed: no user found'})
    }
    
    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
      return res.status(401).json({error: 'Authentication failed: incorrect password'})
    }

    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '3600h'});
    res.status(200).json({user_id: user.id,email: user.email,token: token})
  }
  catch(e){
    res.status(401).json({error: "Login Failed"})
  }
  
}

const signUpUser = async(req:Request, res: Response ) => {
  const {username,email,password} = req.body;
  const parsed = signUpSchema.parse({username:username,email: email,password: password});
  
  try{
    const user = await postRepo.signInUser(email);
    if(user){
     return res.status(409).json({success: false,message: 'user already exists'})
    }
    const passwordHash = await bcrypt.hash(parsed.password,10);
    const response = await postRepo.signUpUser(parsed.username ,parsed.email,passwordHash);
    if(response) 
      res.status(201).json({success: true,message: 'user created successfully'});
  }
  catch(e){
    res.status(500).json({error: "Registration-failed"})
  }
}

export default {signInUser,
  signUpUser}